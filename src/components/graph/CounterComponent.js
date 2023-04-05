import "../index.css";
// useDispatch = Senden der Daten,
// useSelector = Den States holen,
import React from "react";
import { useSelector } from "react-redux";

export const CounterComponent = () => {
	const prices = useSelector((state) => state.dbdata);
	return <div>{prices}</div>;
};
