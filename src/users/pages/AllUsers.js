import { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/errors/ErrorModal";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const Users = (props) => {
  const { sendRequest, error, clearError, isLoading } = useHttpClient();

  return (
    <Fragment>
      <ErrorModal show={error} onClick={clearError} />
      {!isLoading && props.usersData ? (
        <Fragment>
          <h2 className="centered">Users Homepage</h2>
          <UsersList usersData={props.usersData} />
          <Outlet />
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};

export default Users;
