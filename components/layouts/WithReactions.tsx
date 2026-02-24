import clsx from "clsx";

import WithTableOfContentsMock from "@/components/layouts/WithTableOfContentsMock";
import Reactions from "@/components/Reactions";

import type { ReactionsProps } from "@/components/Reactions";

function WithReactions(props: ReactionsProps) {
  return (
    <div
      className={clsx(
        "pointer-events-none sticky bottom-8 !z-10 mt-16",
        "lg:bottom-8 lg:mt-24",
        "fm:static",
      )}
    >
      <WithTableOfContentsMock>
        {/* <div
          className={clsx(
            'mx-auto max-w-[360px] px-4',
            'sm:max-w-[420px] sm:px-0'
          )}
        > */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {/* </div> */}
      </WithTableOfContentsMock>
      <div className="mx-auto sm:max-w-[360px]">
        <Reactions {...props} />
      </div>
    </div>
  );
}

export default WithReactions;
