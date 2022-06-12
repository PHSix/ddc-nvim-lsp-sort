import { Candidate } from "https://deno.land/x/ddc_vim@v1.4.0/types.ts";
import {
  BaseFilter,
  FilterArguments,
} from "https://deno.land/x/ddc_vim@v1.4.0/base/filter.ts";

type Params = Record<string, string>;

export class Filter extends BaseFilter<Params> {
  override filter(args: FilterArguments<Params>): Promise<Candidate[]> {
    if (args.candidates.length > 0 && args.candidates[0].kind) {
      let candidates = args.candidates;
      const texts: Candidate[] = [];
      const snippets: Candidate[] = [];
      candidates = candidates.filter((item) => {
        if (item.kind === "Text") {
          texts.push(item);
        } else if (item.kind === "Snippet") {
          snippets.push(item);
        } else return true;
        return false;
      });
      return Promise.resolve(snippets.concat([...candidates, ...texts]));
    } else {
      return Promise.resolve(args.candidates);
    }
  }
  override params(): Params {
    return {};
  }
}
