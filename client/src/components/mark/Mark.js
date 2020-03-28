import React, { useEffect, useContext, Fragment } from "react";

import MarkContext from "../../actions/mark/markContext";
import { MarkItem } from "./MarkItem";
import Spinner from "../layout/Spinner";

export const Mark = () => {
  const markContext = useContext(MarkContext);
  const { getMark, content, loading } = markContext;
  useEffect(() => {
    getMark();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div className="container-mark">
        {loading ? (
          <Spinner />
        ) : (
          content.map(element => (
            <MarkItem
              key={element.id}
              mark={element.mark}
              mark4={element.mark4}
              markQT={element.markQT}
              markTHI={element.markTHI}
              charMark={element.charMark}
              subjectName={element.subject.subjectName}
            />
          ))
        )}
      </div>
    </Fragment>
  );
};
