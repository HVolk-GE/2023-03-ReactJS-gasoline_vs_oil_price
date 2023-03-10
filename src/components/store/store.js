import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const preloadedState = {
	wholedatas: [],
	wholeoildata: [],
	wholegasdata: [],
	actualbrendprice: [],
	averagegasstation: [],
	actlatit: [],
	actlognit: [],
	dbdata: [],
	rendners: 1,
};

const store = configureStore({ reducer, preloadedState });

export default store;
