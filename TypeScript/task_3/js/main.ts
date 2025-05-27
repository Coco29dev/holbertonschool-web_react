/// <reference path="./js/crud.d.ts" />

import { RowID, RowElement } from './interface';
import * as CRUD from './js/crud.js';

// Création de l'objet row
const row: RowElement = {
  firstName: 'Guillaume',
  lastName: 'Salva'
};

// Insertion et récupération de l'ID
const newRowID: RowID = CRUD.insertRow(row);

// Mise à jour avec âge
const updatedRow: RowElement = {
  firstName: 'Guillaume',
  lastName: 'Salva',
  age: 23
};

// Opérations CRUD
CRUD.updateRow(newRowID, updatedRow);
CRUD.deleteRow(newRowID);
