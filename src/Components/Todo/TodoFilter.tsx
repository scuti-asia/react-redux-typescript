import React, { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { FormattedMessage } from 'react-intl';

export interface Props {
  filtering: string;
  onFilterChange?: (filter: string) => void;
}

const TodoFilterComponent: FunctionComponent<Props> = props => {
  let { filtering, onFilterChange } = props;
  let filterList = ["all", "completed", "incompleted"];

  let handleOnFilterChange = (item: string) => {
    if (onFilterChange) {
      onFilterChange(item);
    }
  };

  const renderFilter = filterList.map((item, key) => {
    if (item === filtering)
      return (
        <Button variant="link" key={key} disabled>
          <FormattedMessage id={item} />
        </Button>
      );
    else
      return (
        <Button
          variant="link"
          key={key}
          onClick={() => handleOnFilterChange(item)}
        >
          <FormattedMessage id={item} />
        </Button>
      );
  });

  return <div>{renderFilter}</div>;
};

export default TodoFilterComponent;
