import React, { Component } from 'react'
import {injectIntl} from 'react-intl';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

interface Props {
  columns: any,
  intl: any,
  data: any,
  table?: Object,
  pages?: number,
  onFetchData: void,
  minRows?: number,
  showPagination: boolean
}

interface State {
  availableColumns: any,
  pageSizeOptions: Array<number>
}

class MoldableTableComponent extends Component<Props, State> {
  static defaultProps = {
    pageSize: 100,
    minRows: 5
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      availableColumns: {},
      pageSizeOptions: [50, 100, 200],
    };

    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.onSortedChange = this.onSortedChange.bind(this);
  }

  /**
   * Method to hook to an event that changes the number of pages around one page.
   *
   * @param {Number} pageSize
   * @param {Number} page
   */
  onPageSizeChange(pageSize: number, page: number) {
    // do some thing here
  }

  onSortedChange(sorted: any, instance: any) {
    // do some thing here
  }

  /**
   * Generate property of column for ReactTable.
   *
   * @param {string} accessor
   * @returns {{Header: string | *, accessor: *}}
   */
  generateColumnProperty(accessor: string) {
    const cellType = this.props.columns[accessor].cellType || 'default';
    let columnProperty = {
      accessor,
      Header: this.props.intl.formatMessage({id: this.props.columns[accessor].label}),
      show: true,
    };
    if (typeof this.state.availableColumns[cellType] === 'function') {
      columnProperty = Object.assign(columnProperty, this.state.availableColumns[cellType](this.props, accessor));
    }

    return columnProperty;
  }

  displayableColumns() {
    let columns = [];
    for (let accessor in this.props.columns) {
      if (!this.props.columns.hasOwnProperty(accessor)) {
        continue;
      }
      let column = this.props.columns[accessor];
      if (column.isForce !== undefined && column.isForce !== true) {
        continue;
      }
      columns.push(this.generateColumnProperty(accessor));
    }
    return columns;
  }

  render() {
    return (
      <div>
        <ReactTable
          manual
          ref={this.props.table}
          className="-striped -highlight"
          filterable={false}
          data={this.props.data}
          columns={this.displayableColumns()}
          pages={this.props.pages}
          pageSizeOptions={this.state.pageSizeOptions}
          onFetchData={typeof this.props.onFetchData === 'function' ? this.props.onFetchData : undefined}
          onPageSizeChange={this.onPageSizeChange}
          onSortedChange={this.onSortedChange}
          previousText={this.props.intl.formatMessage({id: 'Previous page'})}
          nextText={this.props.intl.formatMessage({id: 'Next page'})}
          loadingText={this.props.intl.formatMessage({id: 'Loading...'})}
          noDataText={this.props.intl.formatMessage({id: 'No rows found'})}
          pageText={this.props.intl.formatMessage({id: 'Page'})}
          ofText={this.props.intl.formatMessage({id: 'of'})}
          rowsText={this.props.intl.formatMessage({id: 'rows'})}
          minRows={this.props.minRows}
          showPagination={this.props.showPagination}
        />
      </div>
    )
  }
}

export default injectIntl(MoldableTableComponent)
