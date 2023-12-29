import { gql } from '@urql/next';

export const upsertWidget = gql`
  mutation upsertWidget(
    $object: widgets_insert_input = {
      id: "17daee77-4830-437b-9a78-8dcd730b53bd"
      isShow: true
      name: "好看的小工具"
      user: "4a5e811c-e66b-4b3a-afe0-5c0e8dbdd447"
      widgets_links: {
        data: [
          {
            id: 11 #更新需要
            #link_id: "8b348d87-c081-4b3b-bf6a-15fed934f372" #將Link關聯時需要
            name: "按鈕名稱6"
            link: {
              data: {
                id: "8b348d87-c081-4b3b-bf6a-15fed934f372" #更新需要
                key: "gdfgdg" #新增需要
                user: "4a5e811c-e66b-4b3a-afe0-5c0e8dbdd447" #新增需要
                url: "https://tyutyutyut" #新增更新都需要
              }
              on_conflict: { constraint: links_pkey, update_columns: [url, image] }
            }
          }
        ]
        on_conflict: { constraint: widgets_links_pkey, update_columns: [name, link_id, isShow, config] }
      }
    }
    $deleteIds: widgets_links_bool_exp = { id: { _in: [] } }
  ) {
    insert_widgets_one(
      object: $object
      on_conflict: { constraint: widgets_pkey, update_columns: [isShow, name, config] }
    ) {
      id
    }
    delete_widgets_links(where: $deleteIds) {
      affected_rows
      returning {
        id
      }
    }
  }
`;
