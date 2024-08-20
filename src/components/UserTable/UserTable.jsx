import React from 'react';
import './UserTable.css';
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';

const UserTable = ({ users }) => {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>NOMBRE Y APELLIDO</th>
            <th>CORREO ELECTRONICO</th>
            <th>UBICACION</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.usuario_nom_apell}</td>
              <td>{user.email}</td>
              <td>{user.ubicaciones_nombre}</td>
              <td>               
                <BtnCallToAction text="ver" icon="eye-regular.svg" url={`panel/usuarios/${user.usuarios_id}`}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

