import React, { FC, useState, useContext } from 'react';
import IntentStore from '../Store/IntentStore';
import { Menu, Button, Dropdown } from 'semantic-ui-react';
import { Plot } from '../Store/IntentState';
import getPlotId from '../Utils/PlotIDGen';
import { DataContext, ActionContext } from '../Contexts';

export interface Props {
  store?: IntentStore;
  closeMenu: (addingPlot: boolean) => void;
}

const AddPlotMenu: FC<Props> = ({ closeMenu }: Props) => {
  const data = useContext(DataContext);
  const actions = useContext(ActionContext);

  const datasetOptions = data.numericColumns.map(col => ({
    key: col,
    value: col,
    text: `${data.columnMap[col].short} | ${data.columnMap[col].text}`
  }));

  const [plot, setPlot] = useState<Plot>({
    id: '',
    x: '',
    y: '',
    selectedPoints: [],
    brushes: {}
  });

  return (
    <>
      <Menu.Item>
        <Dropdown
          button
          options={datasetOptions}
          defaultValue={plot.x}
          placeholder="X Axis"
          onChange={(_, data) => setPlot({ ...plot, x: data.value as any })}
        />
      </Menu.Item>
      <Menu.Item>
        <Dropdown
          button
          options={datasetOptions}
          defaultValue={plot.y}
          placeholder="Y Axis"
          onChange={(_, data) => setPlot({ ...plot, y: data.value as any })}
        />
      </Menu.Item>
      <Menu.Item>
        <Button
          disabled={plot.x === '' || plot.y === ''}
          icon="check"
          onClick={() => {
            actions.addPlot({ ...plot, id: getPlotId() });
            closeMenu(false);
          }}
          color="green"
        />
      </Menu.Item>
      <Menu.Item>
        <Button icon="close" onClick={() => closeMenu(false)} color="red" />
      </Menu.Item>
    </>
  );
};

export default AddPlotMenu;
