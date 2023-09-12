import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import baseURL from "../hooks/axiosBase";
import { useForm } from "../hooks/useForm";
import { BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";

const Main = () => {
  const [items, setItems] = useState([]);
  const [usuario, setUsuario] = useState();
  const [response, setResponse] = useState();

  const [formValues, handleInputChange, setValues] = useForm({});

  const handleOnchangeUser = ({ target }) => {
    const user = response.filter(
      (response) => response.Usuarios === target.value
    );
    setUsuario(user);
  };

  const insertItem = (e) => {
    e.preventDefault();
    if (!validarItem()) return false;
    setItems([...items, formValues]);
    setValues({});
    document.getElementById("formItems").reset();
    document.getElementById("recurso").selectedIndex = 0;
    document.getElementById("unidad").selectedIndex = 0;
    document.getElementById("usuario").selectedIndex = 0;
  };

  const validarItem = () => {
    if(formValues.recurso == null || formValues.cantidad == null || formValues.unidad === null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor verifique los que todos los datos de los items esten completos',
      });
      return false
    }
    return true
  }

  const deleteItem = (e, index) => {
    e.preventDefault();
    console.log(index);
    setItems(items.filter((item, i) => i !== index));
  };

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setResponse(response.data.value);
    });
  }, []);

  const saverequest = (e) => {
    e.preventDefault();
    var now = new Date();
      var fecha = (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getFullYear();
      var minutos = now.getMinutes()
      if(minutos<10) minutos="0"+minutos;
      var hora = now.getHours() + ':' + minutos;
      var fechayHora = fecha + ' ' + hora;

    
      if(items.length === 0 ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No ha agregado items a su solicitud',
        });
        return false
      }

      if(usuario === undefined){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor seleccione el usuario que esta solicitando',
        });
        return false
      }

    const data = {
      fecha: fechayHora,
      items: items,
      usuario: usuario[0].Usuarios,
      dependencia: usuario[0].Dependencia,
      cargo: usuario[0].Cargo,
      email: usuario[0].Email,
    };
    const settings = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url =
      "https://prod-16.brazilsouth.logic.azure.com:443/workflows/391357dc745d44958716590706bedbf4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6r43m0E7nN5BVo-hqhy56bAzDtJIYasrAWG6ECwnA-4";
      
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Esta seguro de enviar su solicitud",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {  
        axios.post(url, settings).then((response) => {
          Swal.fire({
            title: "",
            text: "Su registro se guardo correctamente",
            icon: "success",
          });
        });
      }
    });
    document.getElementById("formItems").reset();
    document.getElementById("recurso").selectedIndex = 0;
    document.getElementById("unidad").selectedIndex = 0;
    document.getElementById("usuario").selectedIndex = 0;
    setItems([]);
    setUsuario();
  };

  // Funcion main la cual llama al componente SearchUSer
  return (
    <div>
      <form id="formItems">
        <div className="container">
        <div className="row justify-content-md-center">
        <div className="row g-3 align-items-center">
          <label htmlFor="recurso" className="col-sm-1 offset-md-1">
            Item
          </label>
          <div className="col-sm-8">
            <select
              className="form-select form-select-padding-x"
              name="recurso"
              id="recurso"
              onChange={handleInputChange}
            >
              <option disabled selected>
                Selecciona el recurso que va a solicitar
              </option>
              {response &&
                response.map(
                  (recurso, index) =>
                    recurso.Recursos !== "" && (
                      <option key={"recurso" + index} value={recurso.Recursos}>
                        {" "}
                        {recurso.Recursos}
                      </option>
                    )
                )}
            </select>
          </div>
          </div>

          <div className="row g-3 align-items-center">
            <label htmlFor="cantidad" className="col-sm-1 offset-md-1">
              Cantidad
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                name="cantidad"
                id="cantidad"
                placeholder="Ingrese la cantidad que va a solicitar"
                onBlur={handleInputChange}
              ></input>
            </div>
            <label htmlFor="unidad" className="col-sm-1 offset-md-1">
              Unidad
            </label>
            <div className="col-sm-3">
              <select
                className="form-select"
                name="unidad"
                id="unidad"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  Selecciona el tipo de unidad
                </option>
                <option value="Unidad">Unidad</option>
                <option value="Paquete">Paquete</option>
                <option value="Caja">Caja</option>
              </select>
            </div>
            <div className="d-grid gap-2 col-4 mx-auto">
              <button className="btn btn-primary" onClick={insertItem}>
                Agregar
              </button>
              <p></p>
            </div>
          </div>
          <div className="d-grid gap-2 col-8 mx-auto">
          {items.length > 0 && (
            <Table hover responsive="sm" bordered striped size="md-1">
              <thead>
                <tr>
                  <th className="text-center" >Item</th>
                  <th className="text-center">Recurso</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-center">Unidad</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item.recurso}</td>
                    <td className="text-center">{item.cantidad}</td>
                    <td className="text-center">{item.unidad}</td>
                    <td className="text-center">
                      <button className="btn btn-danger" onClick={(event) => deleteItem(event, index)}>
                        <BsTrashFill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          </div>
          <div className="row g-3 align-items-center">
            <label htmlFor="recurso" className="col-sm-1 offset-md-1">
              Usuario
            </label>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="usuario"
                id="usuario"
                onChange={handleOnchangeUser}
              >
                <option disabled selected>
                  Selecciona la persona que va a solicitar los recursos
                </option>
                {response &&
                  response.map(
                    (usuario, index) =>
                      usuario.Usuarios !== "" && (
                        <option
                          key={"usuario" + index}
                          value={usuario.Usuarios}
                        >
                          {" "}
                          {usuario.Usuarios}
                        </option>
                      )
                  )}
              </select>
            </div>
          </div>

          <div className="row g-3 align-items-center">
            <div className="col-sm-8 offset-md-1">
              <button
                className="btn btn-success"
                type="submit"
                onClick={saverequest}
              >
                Enviar Solicitud
              </button>
              <p></p>
            </div>
          </div>
        </div>
        </div>
      </form>
    </div>
  );
};

export default Main;
