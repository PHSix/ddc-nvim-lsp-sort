import { Candidate } from "https://lib.deno.dev/x/ddc_vim@v1/types.ts";
import {
  BaseFilter,
  FilterArguments,
} from "https://lib.deno.dev/x/ddc_vim@v1/base/filter.ts";

type Params = Record<string, string>;

export class Filter extends BaseFilter<Params> {
  override filter(args: FilterArguments<Params>): Promise<Candidate[]> {
    if (args.candidates.length > 0 && args.candidates[0].kind) {
      let candidates = args.candidates;
      const texts: Candidate[] = [];
      candidates = candidates.filter((item) => {
        if (item.kind === "Text") {
          texts.push(item);
          return false;
        } else return true;
      });
      return Promise.resolve(candidates.concat(texts));
    } else {
      return Promise.resolve(args.candidates);
    }
  }
  override params(): Params {
    return {};
  }
}
