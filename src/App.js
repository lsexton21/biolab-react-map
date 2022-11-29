import { useContext, useState, useEffect, Fragment } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "./shared/context/auth-context";
import { useHttpClient } from "./shared/hooks/http-hook";

//importing pages for routes
import Homepage from "./homepageMap/pages/HomepageMap";
import UserHomepage from "./users/pages/UserHomepage";
import EditUser from "./users/components/EditUser";
import NewSpecies from "./species/pages/NewSpecies";
import EditSpecies from "./species/pages/EditSpecies";
import NotFound from "./shared/errors/NotFound";
import SpeciesProfile from "./species/pages/SpeciesProfile";
import Layout from "./shared/Layout/Layout";
import LoadingSpinner from "./shared/UI/LoadingSpinner";
import UserSettings from "./users/components/UserSettings";
import MySpecies from "./users/components/MySpecies";
import Auth from "./users/pages/Auth";
import Login from "./users/components/Login";
import Register from "./users/components/Register";

const App = () => {
  const { sendRequest } = useHttpClient();
  const [speciesData, setSpeciesData] = useState();
  const [usersData, setUsersData] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/species"
        );
        setSpeciesData(responseData.species);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSpecies();
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/users"
        );
        setUsersData(responseData.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      authCtx.login(storedData.userId, storedData.token);
    } else {
      <Navigate to="/" replace={true} />;
    }
  }, [sendRequest, authCtx]);

  return (
    <Fragment>
      {speciesData && usersData ? (
        <Layout usersData={usersData}>
          <Routes>
            {authCtx.isLoggedIn ? (
              <Fragment>
                <Route
                  path="/"
                  element={<Homepage speciesData={speciesData} />}
                >
                  <Route
                    path="species/:speciesId"
                    element={
                      <SpeciesProfile
                        speciesData={speciesData}
                        usersData={usersData}
                      />
                    }
                  />
                </Route>
                <Route path="users">
                  <Route
                    path=":userId"
                    element={
                      <UserHomepage
                        usersData={usersData}
                        speciesData={speciesData}
                      />
                    }
                  >
                    <Route
                      path="myspecies"
                      element={<MySpecies speciesData={speciesData} />}
                    >
                      <Route
                        path=":speciesId/edit"
                        element={<EditSpecies speciesData={speciesData} />}
                      />
                    </Route>
                    <Route path="settings" element={<UserSettings />} />
                    <Route path="newSpecies" element={<NewSpecies />} />
                  </Route>

                  <Route
                    path=":userId/edit"
                    element={<EditUser usersData={usersData} />}
                  />
                </Route>
                <Route path="/*" element={<NotFound />} />
              </Fragment>
            ) : (
              <Fragment>
                <Route path="/auth" element={<Auth />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>
                <Route
                  path="/"
                  element={<Homepage speciesData={speciesData} />}
                >
                  <Route
                    path="species/:speciesId"
                    element={
                      <SpeciesProfile
                        speciesData={speciesData}
                        usersData={usersData}
                      />
                    }
                  />
                </Route>
                <Route path="/*" element={<Navigate to="/" replace={true} />} />
              </Fragment>
            )}
          </Routes>
        </Layout>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};

export default App;
