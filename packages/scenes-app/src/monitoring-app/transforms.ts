import { map } from 'rxjs';

import {
  BasicValueMatcherOptions,
  CustomTransformOperator,
  DataTransformerID,
  getFrameDisplayName,
  ValueMatcherID,
} from '@grafana/data';
import { DataTransformerConfig, MatcherConfig } from '@grafana/schema';

export function getTableFilterTransform(query: string): DataTransformerConfig {
  const regex: MatcherConfig<BasicValueMatcherOptions<string>> = {
    id: ValueMatcherID.regex,
    options: { value: query },
  };

  return {
    id: DataTransformerID.filterByValue,
    options: {
      type: 'include',
      match: 'all',
      filters: [
        {
          fieldName: 'handler',
          config: regex,
        },
      ],
    },
  };
}

export function getTimeSeriesFilterTransform(query: string): CustomTransformOperator {
  return () => (source) => {
    return source.pipe(
      map((data) => {
        return data.filter((frame) => getFrameDisplayName(frame).toLowerCase().includes(query.toLowerCase()));
      })
    );
  };
}
