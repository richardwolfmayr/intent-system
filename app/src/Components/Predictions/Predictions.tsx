import React, {FC} from 'react';
import IntentStore from '../../Store/IntentStore';
import {inject, observer} from 'mobx-react';
import AnnotationBox from './AnnotationBox';
import {style} from 'typestyle';
import PredictionList from './PredictionList';
import Selections from './Selections';
import {getAllSelections} from './PredictionRowType';

interface Props {
  store?: IntentStore;
}

export type Selection = {
  values: number[];
  union: number;
  intersection: number;
  individual: number;
  total: number;
};

const Predictions: FC<Props> = ({store}: Props) => {
  const {annotation, plots, multiBrushBehaviour} = store!;

  const selections: Selection = getAllSelections(
    plots,
    multiBrushBehaviour === 'Union',
  );

  return (
    <div className={predictionColumnStyle}>
      <AnnotationBox annotation={annotation} />
      <PredictionList selections={selections.values} />
      <Selections selections={selections} />
    </div>
  );
};

export default inject('store')(observer(Predictions));

const predictionColumnStyle = style({
  gridArea: 'pred',
  height: '100vh',
  display: 'grid',
  gridTemplateRows: 'min-content 1fr 0.5fr',
  gridTemplateAreas: `
  "annotation"
  "predictions"
  "selections"
  `,
});
