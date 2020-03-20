import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import MyFirstFieldCustomizer, { IMyFirstFieldCustomizerProps } from './components/MyFirstFieldCustomizer';
import { sp } from '@pnp/sp';

export default class MyFirstFieldCustomizerFieldCustomizer
  extends BaseFieldCustomizer<any> {

  @override
  public onInit(): Promise<void> {
    sp.setup({spfxContext: { pageContext: this.context.pageContext }});
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    const myFirstFieldCustomizer: React.ReactElement<{}> =
      React.createElement(MyFirstFieldCustomizer,
        {
          fieldValue: event.fieldValue,
          context: this.context,
          listItemId: event.listItem.getValueByName("ID")
        });

    ReactDOM.render(myFirstFieldCustomizer, event.domElement);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
