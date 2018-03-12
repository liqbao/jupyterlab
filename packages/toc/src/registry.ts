// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {IInstanceTracker} from '@jupyterlab/apputils';

import {Widget} from '@phosphor/widgets';

import {IHeading} from './toc';

/**
 * A class that keeps track of the different kinds
 * of widgets for which there can be tables-of-contents.
 */
export class TableOfContentsRegistry {
  /**
   * Given a widget, find an IGenerator for it,
   * or undefined if none can be found.
   */
  findGeneratorForWidget(
    widget: Widget,
  ): TableOfContentsRegistry.IGenerator | undefined {
    let generator: TableOfContentsRegistry.IGenerator | undefined;
    this._generators.forEach(gen => {
      console.log(gen);
      if (gen.tracker.has(widget)) {
        generator = gen;
      }
    });
    return generator;
  }

  /**
   * Add a new IGenerator to the registry.
   */
  addGenerator(generator: TableOfContentsRegistry.IGenerator): void {
    this._generators.push(generator);
  }

  private _generators: TableOfContentsRegistry.IGenerator[] = [];
}

/**
 * A namespace for TableOfContentsRegistry statics.
 */
export namespace TableOfContentsRegistry {
  /**
   * An interface for an object that knows how to generate a table-of-contents
   * for a type of widget.
   */
  export interface IGenerator<W extends Widget = Widget> {
    /**
     * An instance tracker for the widget.
     */
    tracker: IInstanceTracker<W>;

    /**
     * A function that takes the widget, and produces
     * a list of headings.
     */
    generate(widget: W): IHeading[];
  }
}
