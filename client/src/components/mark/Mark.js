import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import getMark from "../../actions/marks";

import { MarkItem } from "./MarkItem";
import Spinner from "../layout/Spinner";

const Mark = props => {
  const { getMark, content, loading } = props;
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

const mapStateToProps = state => ({
  content: state.marks.content,
  loading: state.marks.loading
});

export default connect(mapStateToProps, { getMark })(Mark);
