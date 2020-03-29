import React, { useCallback, useContext, useState } from 'react';
import { Container, Form } from 'semantic-ui-react';
import { style } from 'typestyle';

import { ConfigContext } from '../../../Contexts';
import { StudyActions } from '../../../Store/StudyStore/StudyProvenance';
import { Questions } from './FeedbackQuestions';
import LikertComponent from './LikertComponent';

type Props = {
  actions: StudyActions;
};

const FinalFeedback = ({ actions }: Props) => {
  const config = useContext(ConfigContext);

  const arr = new Array(Questions.length).fill(-1);
  const [finalFeedback, setFinalFeedback] = useState<number[]>(arr);
  const [feedbackText, setFeedbackText] = useState("");

  const setFeedback = useCallback((id: number, val: number) => {
    setFinalFeedback(feed => {
      const newFeedback = [...feed];
      newFeedback[id] = val;
      return newFeedback;
    });
  }, []);

  if (config.coding === "yes")
    return (
      <div className={finalFeedbackStyle}>
        <Form>
          <Form.Field>
            Thank you for participating. Please share this code with the
            experimenter: {config.sessionId}
          </Form.Field>
        </Form>
      </div>
    );

  return (
    <div className={finalFeedbackStyle}>
      <Container>
        <Form>
          {Questions.map(({ question, lowText, highText, id }) => (
            <LikertComponent
              key={question}
              question={question}
              leftText={lowText}
              rightText={highText}
              count={5}
              val={finalFeedback[id]}
              id={id}
              setFeedback={setFeedback}
            />
          ))}
          <Form.Field as="h1">
            Please enter any other comments below.
          </Form.Field>
          <Form.TextArea
            value={feedbackText}
            onChange={(_, { value }) => {
              if (typeof value !== "string") return;
              setFeedbackText(value);
            }}
          />
          <Form.Button
            primary
            disabled={finalFeedback.includes(-1)}
            onClick={() => {
              actions.submitFinalFeedback(finalFeedback, feedbackText);
            }}
          >
            Submit
          </Form.Button>
        </Form>
      </Container>
    </div>
  );
};

export default FinalFeedback;

const finalFeedbackStyle = style({
  // height: "100vh",
  // width: "100vw",
  // display: "flex",
  // // alignItems: "center",
  // justifyContent: "center",
  // overflow: "scroll"
});