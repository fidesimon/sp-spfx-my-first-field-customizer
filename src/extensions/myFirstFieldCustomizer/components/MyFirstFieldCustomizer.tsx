import { override } from '@microsoft/decorators';
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import { debounce } from 'lodash';

import styles from './MyFirstFieldCustomizer.module.scss';
import { FieldCustomizerContext } from '@microsoft/sp-listview-extensibility';

export interface IMyFirstFieldCustomizerProps {
  fieldValue: string;
  context: FieldCustomizerContext;
  listItemId: number;
}

export default class MyFirstFieldCustomizer extends React.Component<IMyFirstFieldCustomizerProps, {}> {
  constructor(props: IMyFirstFieldCustomizerProps) {
    super(props);
  }

  updateItem = debounce(value => {
    sp.web.lists.getByTitle(this.props.context.pageContext.list.title)
      .items.getById(this.props.listItemId).update({
      FCField: value
    }).then(i=>{
      console.log(i);
    }).catch(j=>console.log(j));
  },1000);

  @override
  public render(): React.ReactElement<{}> {
    return (
      
      <div className={styles.cell}>
        <TextField value={this.props.fieldValue} onChanged={
          (evt: any) => {
            this.updateItem(evt);
          }
        } />
      </div>
    );
  }
}
