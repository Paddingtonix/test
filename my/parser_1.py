import pandas as pd

if __name__ == '__main__':
    df = pd.read_excel('./public/api/output.xlsx', index_col=0, skiprows=1, engine='openpyxl')

    json_data = {
        row_label: {col_label: df.loc[row_label, col_label]
                    for col_label in df.columns}
        for row_label in df.index
    }

    new_json_data = {}
    new_json_data['columns'] =  [{'accessorKey': '1', 'header': ''}] + [{'accessorKey': f'{i+2}', 'header': k} for i, k in enumerate(df.columns)]
    columns_translate =  {k: f'{i+2}' for i, k in enumerate(df.columns)}
    new_json_data['data'] =   [{"1": k, **{columns_translate[k1]:v1 for k1,v1 in v.items() if str(v1) != 'nan'}} for k, v in json_data.items()]
    json_data = new_json_data

    with open('./public/api/output.json', 'w+', encoding='utf-8') as json_file:
        json_file.write(str(json_data)
                        .replace('\'', '\"')
                        .replace('nan', 'null'))

