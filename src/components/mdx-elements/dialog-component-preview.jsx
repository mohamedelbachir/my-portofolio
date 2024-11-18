import "./dialog-style.css"
import React, { useRef } from 'react';

export const Modal1 = () => {
  const dialogRef = useRef(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div>
      {/* Button to open the dialog */}
      <button
        onClick={openDialog}
        className="bg-gray-400 text-white px-4 py-2 rounded"
      >
        Ouvrir la modale
      </button>

      {/* Dialog element */}
      <dialog ref={dialogRef} 
      //className="rounded-lg shadow-lg p-4" 
      >
        <p>Ceci est une boîte de dialogue modale native en HTML <br/>( très moche pour l'instant ) !</p>
        <button
          onClick={closeDialog}
          //className="bg-red-500 text-white px-3 py-1 rounded mt-4"
        >
          Fermer
        </button>
      </dialog>
    </div>
  );
};

export const Modal2 = () => {
  const dialogRef = useRef(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div>
      {/* Button to open the dialog */}
      <button
        onClick={openDialog}
        className="bg-gray-400 text-white px-4 py-2 rounded"
      >
        Ouvrir la modale
      </button>

      {/* Dialog element */}
      <dialog ref={dialogRef} 
       className="rounded-lg shadow-md p-4" 
      >
        <p>Ceci est une boîte de dialogue modale native en HTML <br/>( humm , très stylé heeh ) !</p>
        <button
          onClick={closeDialog}
          className="bg-red-500 text-white px-3 py-1 rounded mt-4"
        >
          Fermer
        </button>
      </dialog>
    </div>
  );
};



export const ModalWithForm = () => {
  const dialogRef = useRef(null);

  const ouvrirDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const fermerDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div>
      {/* Bouton pour ouvrir le dialog */}
      <button
        onClick={ouvrirDialog}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ouvrir le formulaire
      </button>

      {/* Dialog avec formulaire */}
      <dialog
        ref={dialogRef}
        className="rounded-lg shadow-lg p-4 bg-white w-[30rem] max-w-full mx-auto"
      >
        <h2 className="text-lg font-bold mb-2 mt-0">Formulaire dans une modale</h2>
        <form method="dialog" className="space-y-4" >
          {/* Champ Nom */}
          <div>
            <label htmlFor="nom" className="block font-medium mb-1">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>
          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>
          {/* Boutons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={fermerDialog}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Soumettre
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};




