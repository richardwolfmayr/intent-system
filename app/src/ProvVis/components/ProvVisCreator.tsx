import React from 'react';
import ReactDOM from 'react-dom';
import ProvVis from './ProvVis';
import { ProvenanceGraph, NodeID } from '@visdesignlab/provenance-lib-core';

export interface ProvVisConfig {
  height: number;
  width: number;
  sideOffset: number;
  backboneGutter: number;
  gutter: number;
  verticalSpace: number;
  regularCircleRadius: number;
  backboneCircleRadius: number;
  regularCircleStroke: number;
  backboneCircleStroke: number;
  topOffset: number;
  textSize: number;
  linkWidth: number;
  duration: number;
}

export function ProvVisCreator<T, S extends string, A>(
  node: Element,
  graph: ProvenanceGraph<T, S, A>,
  fauxRoot: NodeID = graph.root,
  config: Partial<ProvVisConfig> = {}
) {
  ReactDOM.render(
    <ProvVis
      {...config}
      graph={graph}
      root={fauxRoot}
      current={graph.current}
      nodeMap={graph.nodes}
    />,
    node
  );
}
