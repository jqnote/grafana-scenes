import React from 'react';
import { selectors } from '@grafana/e2e-selectors';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { SceneDataLayerControl } from './SceneDataLayerControls';
import { TestAnnotationsDataLayer } from './TestDataLayer';

describe('SceneDataLayerControl', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('renders loading indicator when layers state is Loading', () => {
    const layer = new TestAnnotationsDataLayer({
      name: 'Layer 1',
    });

    render(<SceneDataLayerControl layer={layer} isEnabled={true} onToggleLayer={() => {}} />);
    expect(screen.queryAllByLabelText(selectors.components.LoadingIndicator.icon)).toHaveLength(0);

    act(() => {
      layer.activate();
    });

    expect(screen.queryAllByLabelText(selectors.components.LoadingIndicator.icon)).toHaveLength(0);

    act(() => {
      layer.startRun();
    });
    expect(screen.queryAllByLabelText(selectors.components.LoadingIndicator.icon)).toHaveLength(1);

    act(() => {
      layer.completeRun();
    });
    expect(screen.queryAllByLabelText(selectors.components.LoadingIndicator.icon)).toHaveLength(0);

    act(() => {
      layer.startRun();
    });
    expect(screen.queryAllByLabelText(selectors.components.LoadingIndicator.icon)).toHaveLength(1);

    act(() => {
      layer.completeRunWithError();
    });
    expect(screen.queryAllByLabelText(selectors.components.LoadingIndicator.icon)).toHaveLength(0);
  });

  it('hides loading indicator when query canceled by loading indicator click', async () => {
    const layer = new TestAnnotationsDataLayer({
      name: 'Layer 1',
    });

    render(<SceneDataLayerControl layer={layer} isEnabled={true} onToggleLayer={() => {}} />);

    act(() => {
      layer.activate();
      layer.startRun();
    });
    expect(screen.queryAllByLabelText(selectors.components.LoadingIndicator.icon)).toHaveLength(1);

    act(() => {
      fireEvent.mouseDown(screen.getByLabelText(selectors.components.LoadingIndicator.icon));
    });

    expect(screen.queryAllByLabelText(selectors.components.LoadingIndicator.icon)).toHaveLength(0);
  });
});
