import React, { FC, useState, ReactChild, useContext } from "react";
import { Modal, Header, Form, Button, TextArea } from "semantic-ui-react";
import { ProvenanceGraph } from "@visdesignlab/provenance-lib-core";
import { StudyActionContext } from "../../Contexts";

type Props = {
  selections: number[];
  graph: ProvenanceGraph<any, any, any>;
  trigger: ReactChild;
};

const Feedback: FC<Props> = ({ selections, graph, trigger }: Props) => {
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [difficultyScore, setDifficultyScore] = useState<number | null>(null);
  const [extraFeedback, setExtraFeedback] = useState<string>("");

  const { endTask, currentTaskNumber } = useContext(StudyActionContext);

  const scores = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Modal
      trigger={trigger}
      closeOnDimmerClick={false}
      closeOnEscape={false}
      closeOnDocumentClick={false}
    >
      <Modal.Header>
        <Header as="h1">Task {currentTaskNumber}</Header>
      </Modal.Header>
      <Modal.Content as={Form}>
        <Form.Field as="h2">
          On scale of 1 (easy) to 7 (hard), how hard was this task?
        </Form.Field>
        <Form.Group>
          <Form.Field as="h3">Easy</Form.Field>
          {scores.map(score => (
            <Form.Radio
              key={score}
              value={score}
              label={score}
              checked={difficultyScore === score}
              onChange={(_, { value }) => {
                setDifficultyScore(value as number);
              }}
            />
          ))}
          <Form.Field as="h3">Hard</Form.Field>
        </Form.Group>
      </Modal.Content>
      <Modal.Content as={Form}>
        <Form.Field as="h2">
          On scale of 1 (not confident) to 7 (confident), how confident are you
          with you answers?
        </Form.Field>
        <Form.Group>
          <Form.Field as="h3">Easy</Form.Field>
          {scores.map(score => (
            <Form.Radio
              key={score}
              value={score}
              label={score}
              checked={confidenceScore === score}
              onChange={(_, { value }) => {
                setConfidenceScore(value as number);
              }}
            />
          ))}
          <Form.Field as="h3">Hard</Form.Field>
        </Form.Group>
      </Modal.Content>
      <Modal.Content as={Form}>
        <Form.Field as="h2">
          Enter any additional feedback you may here below:
        </Form.Field>
        <Form.Field>
          <TextArea
            placeholder="Enter any additional information or comments here."
            value={extraFeedback}
            onChange={(_, { value }) => setExtraFeedback(value as string)}
          />
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          content="Next Task"
          onClick={() => {
            if (confidenceScore && difficultyScore) {
              endTask(
                selections,
                graph,
                confidenceScore,
                difficultyScore,
                extraFeedback
              );
            }
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default Feedback;