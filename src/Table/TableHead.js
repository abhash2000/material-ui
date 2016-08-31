// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('TableHead', (theme) => {
  return {
    root: {
      fontSize: 12,
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
  };
}, { index: 15 });

/**
 * A material table head.
 *
 * ```jsx
 * <TableHead>
 *   <TableRow>....</TableRow>
 * </TableHead>
 * ```
 */
export default class TableHead extends Component {
  static propTypes = {
    /**
     * Should be valid `<thead>` children such as `TableRow`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static contextTypes = {
    table: PropTypes.object,
    styleManager: PropTypes.object.isRequired,
  };

  static childContextTypes = { table: PropTypes.object };

  getChildContext() {
    return { table: { head: true } };
  }

  render() {
    const {
      className: classNameProp,
      children,
      ...other,
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, classNameProp);

    return (
      <thead className={className} {...other}>
        {children}
      </thead>
    );
  }
}