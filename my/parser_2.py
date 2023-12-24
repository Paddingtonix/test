import random
import pandas as pd
import numpy as np
import uuid
import json

def main():
    grapf_np = pd.read_excel("test.xlsx",sheet_name='Sheet1').values
    nodes = []
    edges = []
    counter = 0
    help_dict = {}
    for node in grapf_np[0]:
        if node is not np.nan:
            print(node)
            _type, _class = node.split('|')[1:-1]
            nodes.append({'id': counter, 'label': node, 'type': _type, 'class': _class, 'group': _class})
            help_dict.update({node:counter})
            counter += 1

    for index_row in range(1,len(grapf_np)):
        if grapf_np[index_row][0] in help_dict:
            from_id = help_dict[grapf_np[index_row][0]]
            for index_col in range(1,len(grapf_np[index_row])):
                edge = grapf_np[index_row][index_col]
                if edge is not np.nan and edge != '?':
                    id = None
                    rel_mas = edge.split('|')
                    if len(rel_mas) == 2:
                        rel_type = rel_mas[0]
                        tests = rel_mas[1].split(',')
                        to_id = help_dict[grapf_np[0][index_col]]

                        arrows = "to"
                        if rel_type == '0':
                            arrows = "to, from"

                        if tests[0] == '':
                            tests = []
                        if len(rel_type.split(';')) == 2:
                            edges.append(
                                {'from': from_id, 'to': to_id, 'id': id, 'arrows': 'to', 'tests': tests})
                            edges.append(
                                {'from': from_id, 'to': to_id, 'id': id, 'arrows': 'to, from', 'tests': tests})
                        else:
                            edges.append(
                                {'from': from_id, 'to': to_id, 'id': id, 'arrows': arrows, 'tests': tests})
                    elif len(rel_mas) == 3:
                        if len(rel_mas[1].split(';')) == 2:
                            slem_rel_mas = edge.split(';')
                            t1 = slem_rel_mas[0].split('|')
                            t1_rel_type = t1[0]
                            t1_tests = t1[1].split(',')
                            to_id = help_dict[grapf_np[0][index_col]]

                            t1_arrows = "to"
                            if t1_rel_type == '0':
                                t1_arrows = "to, from"

                            if t1_tests[0] == '':
                                t1_tests = []

                            t2 = slem_rel_mas[1].split('|')
                            t2_rel_type = t2[0]
                            t2_tests = t2[1].split(',')
                            to_id = help_dict[grapf_np[0][index_col]]

                            t2_arrows = "to"
                            if t2_rel_type == '0':
                                t2_arrows = "to, from"

                            if t2_tests[0] == '':
                                t2_tests = []

                            if t1_rel_type == t2_rel_type:
                                edges.append(
                                    {'from': from_id, 'to': to_id, 'id': id, 'arrows': t1_arrows,
                                     'tests': t1_tests+t2_tests})
                            else:
                                edges.append(
                                    {'from': from_id, 'to': to_id, 'id': id, 'arrows': t1_arrows,
                                     'tests': t1_tests})
                                edges.append(
                                    {'from': from_id, 'to': to_id, 'id': id, 'arrows': t2_arrows,
                                     'tests': t2_tests})
                                
    data = {"nodes": nodes, "edges": edges}
    with open('./src/grapf.json', 'w', encoding="utf-8") as outfile:
        json.dump(data, outfile, ensure_ascii=False)

    
if __name__ == '__main__':
    main()

