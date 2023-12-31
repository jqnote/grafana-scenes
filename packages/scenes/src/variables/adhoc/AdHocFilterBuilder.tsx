import React from 'react';

import { AdHocFilterRenderer } from './AdHocFilterRenderer';
import { AdHocFilterSet } from './AdHocFiltersSet';
import { Button } from '@grafana/ui';

interface Props {
  model: AdHocFilterSet;
}

export function AdHocFilterBuilder({ model }: Props) {
  const { _wip } = model.useState();

  if (!_wip) {
    return (
      <Button
        variant="secondary"
        icon="plus"
        title={'Add filter'}
        aria-label="Add filter"
        data-testid={`AdHocFilter-add`}
        onClick={() => model._addWip()}
      />
    );
  }

  return <AdHocFilterRenderer filter={_wip} model={model} />;
}
