import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import { ConsultarTablasSegunIDTabla } from "../../consultasBE/Tablas";
import { EstructuraTabla1 } from "../UserPages/EstructuraTabla1";
import { EstructuraTabla2 } from "../UserPages/EstructuraTabla2";
import { ObtenerUsuarioPorCC } from "../../consultasBE/User";

const ContenedorPagina = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 2vw;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
`;

const Contenedor1 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  & > .buscarCodigo {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const InputField = styled.input`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
  width: 100%;
`;
const ButtonVerif = styled.button`
  outline: none;
  padding: 6px 10px;
  background-color: var(--color-4);

  border: solid 1px var(--color-2);
  color: var(--color-2);
  outline: none;
  border-radius: 5px;
  cursor: pointer;
`;
const TablaDatos = styled.div`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  border-radius: 5px;
  display: flex;
  gap: 5px;
  flex-direction: column;

  & > .fila {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;
const def = {
  nombre: "",
  cc: "",
  ps: "",
};

const VerificarCodigo = ({ cedulacelular, setCodigo }) => {
  const [verif, setVerif] = useState(false);
  const [seConsulto, setSeConsulto] = useState(false);
  const [data, setData] = useState(def);

  const BuscarTabla = async () => {
    setVerif(true);
    const resp = await ObtenerUsuarioPorCC(cedulacelular);
    setSeConsulto(true);
    // console.log(resp);
    if (resp) {
      if (resp.data) {
        let nombre = resp.data.nombre;
        let cc = resp.data.cc;
        let ps = resp.data.password;
        setData((prevData) => ({
          ...prevData,
          nombre: nombre, // Actualizar el campo correspondiente
          cc: cc, // Actualizar el campo correspondiente
          ps: ps, // Actualizar el campo correspondiente
        }));
        // console.log(resp.data);
      }
    }
    setVerif(false);
  };

  const handleCodigoChange = (value) => {
    let cod = value.toUpperCase().trim();

    setCodigo(cod);
    limpiar();
  };

  const limpiar = () => {
    setVerif(false);
    setSeConsulto(false);
    setData(def);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <Contenedor1>
        <div className="buscarCodigo">
          Cedula o Número Vendedor:
          <div>
            <InputField
              type="text"
              value={cedulacelular}
              onChange={(e) => handleCodigoChange(e.target.value)}
            />
          </div>
          {cedulacelular.length > 9 && (
            <ButtonVerif onClick={BuscarTabla}>
              {verif ? "Buscando..." : "Buscar"}
            </ButtonVerif>
          )}
        </div>
      </Contenedor1>
      {seConsulto ? (
        data.cc !== "" ? (
          <Contenedor1>
            Cliente Encontrado
            <TablaDatos>
              <div className="fila">
                <span>
                  <b>Nombre:</b>
                </span>
                <span>{data.nombre}</span>
              </div>
              <div className="fila">
                <span>
                  <b>Cedula/Teléfono:</b>
                </span>
                <span>{data.cc}</span>
              </div>
              <div className="fila">
                <span>
                  <b>Password:</b>
                </span>
                <span>{data.ps}</span>
              </div>
            </TablaDatos>
          </Contenedor1>
        ) : (
          <Contenedor1>
            No se encontro el cliente con código: {cedulacelular}
          </Contenedor1>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

// Estilo del contenedor del grid
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 1px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f3f3f3;
`;

// Estilo de cada ítem del grid
const GridItem = styled.div`
  padding: 5px 10px;
  background: white;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    border: none;
    border-radius: 5px;
    width: 100%;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &.edit {
      width: fit-content;
      font-size: 16px;
    }
    &.selected {
      background-color: var(--color-2);
      color: white;
    }
    &:hover {
      transform: scale(1.06);
    }
    &.bloqueado {
      background-color: red;
      color: white;
    }
  }
`;

// Estilo para los encabezados del grid
const GridHeader = styled.div`
  padding: 2px 4px;
  background-color: #dddddd;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  /* border: 1px solid #ccc; */
`;
function UserGrid({ users, toggleBlock, editID, setEditID }) {
  return (
    <GridContainer>
      {/* Encabezados de la tabla */}
      <GridHeader className="grid-header-cc">CC</GridHeader>
      <GridHeader className="grid-header-alias">Alias</GridHeader>
      <GridHeader className="grid-header-nombre">Nombre</GridHeader>
      <GridHeader className="grid-header-password">Password</GridHeader>
      <GridHeader className="grid-header-action">Estado</GridHeader>
      <GridHeader className="grid-header-edit">Editar</GridHeader>

      {/* Datos de los usuarios */}
      {users.map((user, index) => (
        <React.Fragment key={index}>
          <GridItem className="user-cc">{user.cc}</GridItem>
          <GridItem className="user-alias">{user.alias}</GridItem>
          <GridItem className="user-name">{user.name}</GridItem>
          <GridItem className="user-password">{user.password}</GridItem>
          <GridItem className="user-action">
            <button
              className={user.bloq && "bloqueado"}
              onClick={() => toggleBlock(user.cc)}
            >
              {user.bloq ? "Desbloquear" : "Bloquear"}
            </button>
          </GridItem>
          <GridItem className="user-edit">
            <button
              className={`${editID === user.cc && "selected"} edit`}
              onClick={() => setEditID(editID === user.cc ? 0 : user.cc)}
            >
              {user.cc === editID ? (
                <i className="bi bi-x-square-fill"></i>
              ) : (
                <i className="bi bi-pencil-square"></i>
              )}
            </button>
          </GridItem>
        </React.Fragment>
      ))}
    </GridContainer>
  );
}
const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
`;

const BotonSubmit = styled.button`
  grid-column: 1 / span 2;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
function UserForm({ users, cc }) {
  const [userData, setUserData] = useState({
    cc: "",
    nombre: "",
    password: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [showSaveButton, setShowSaveButton] = useState(false);

  // Cargar datos según el CC
  useEffect(() => {
    const user = users.find((user) => user.cc === cc);
    if (user) {
      setUserData(user);
      setOriginalData(user);
    }
  }, [cc, users]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Verificar si hay cambios para mostrar el botón de guardar
  useEffect(() => {
    if (JSON.stringify(userData) !== JSON.stringify(originalData)) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [userData, originalData]);

  // Función para guardar los datos
  const handleSave = () => {
    // Aquí se podría implementar la lógica para guardar los datos modificados
    console.log("Datos guardados:", userData);
    setOriginalData(userData);
    setShowSaveButton(false);
  };

  return (
    <FormContainer>
      <Label>CC:</Label>
      <Input name="cc" value={userData.cc} onChange={handleChange} disabled />

      <Label>Alias:</Label>
      <Input name="alias" value={userData.alias} onChange={handleChange} />
      <Label>Nombre:</Label>
      <Input name="nombre" value={userData.name} onChange={handleChange} />


      <Label>Password:</Label>
      <Input
        name="password"
        value={userData.password}
        onChange={handleChange}
      />

      {showSaveButton && (
        <BotonSubmit onClick={handleSave}>Guardar Cambios</BotonSubmit>
      )}
    </FormContainer>
  );
}

const usuariosSample = [
  {
    cc: "0958489438",
    name: "Jorge Luis Castro Amparo",
    alias: "El Charito",
    password: "locastro120",
    bloq: false,
  },
  {
    cc: "04568459585",
    name: "Charls Hector Jordan",
    alias: "El Mingas",
    password: "isan2834",
    bloq: true,
  },
  {
    cc: "019383945859",
    name: "Laura Nube Morales",
    alias: "La Hamburguesa Simple",
    password: "loquita293",
    bloq: true,
  },
  {
    cc: "+593008583929",
    name: "Nicolas Gonzalo Guillen",
    alias: "El pianista",
    password: "norlp9023",
    bloq: false,
  },
];

const ManageUsersVend = () => {
  const [codigoConsulta, setCodigoConsulta] = useState("");
  const [usuariosVend, setUsuariosVend] = useState(usuariosSample);
  const [editID, setEditID] = useState(0);
  // const ConsultarUsuarios = async () => {
  //   const res = await ConsultarUserVendedores();
  //   if (res.length > 0) {
  //     setUsuariosVend(res);
  //   }
  // };
  // useEffect(() => {
  //   ConsultarUsuarios();
  // }, []);
  // const ActualizarBloqueo = async (userID) => {
  //   await ActualizarBloqueoUsuario({userID});
  // };
  const toggleBloq = async (userID) => {
    // await ActualizarBloqueo(userID);
    // await ConsultarUsuarios();
  };
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Administrar Vendedores</h1>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Contenedor1>
            {usuariosVend.length > 0 && (
              <UserGrid
                users={usuariosVend}
                toggleBlock={toggleBloq}
                editID={editID}
                setEditID={setEditID}
              />
            )}
          </Contenedor1>
          {editID !== 0 && (
            <Contenedor1>
              <UserForm users={usuariosVend} cc={editID} />
            </Contenedor1>
          )}
        </div>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default ManageUsersVend;
