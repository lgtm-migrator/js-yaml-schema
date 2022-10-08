import { InvalidArgumentError, isNone } from '@apextoaster/js-utils';
import { Type as YamlType } from 'js-yaml';

export const REGEXP_REGEXP = /^\/(.+)\/([gimsuy]*)$/;

/**
 * @public
 */
export const regexpType = new YamlType('!regexp', {
  kind: 'scalar',
  resolve(value: string) {
    return REGEXP_REGEXP.test(value);
  },
  construct(value: string): RegExp {
    const match = REGEXP_REGEXP.exec(value);
    if (isNone(match)) {
      throw new InvalidArgumentError('invalid regexp');
    }
    const [/* input */, expr, flags] = Array.from(match);
    return new RegExp(expr, flags);
  },
});
