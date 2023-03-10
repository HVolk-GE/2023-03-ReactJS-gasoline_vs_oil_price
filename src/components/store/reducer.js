const reducer = (state, action) => {
	switch (action.type) {
		case "WHOLE_TANKPRICES_DATA":
			return {
				...state,
				wholedatas: action.wholedatas,
			};
		case "WHOLE_OIL_DATA":
			return {
				...state,
				wholeoildata: action.wholeoildata,
			};
		case "WHOLE_GAS_DATA":
			return {
				...state,
				wholeoildata: action.wholeoildata,
			};
		case "AVERAGE_GASSTATION_PRICE":
			return {
				...state,
				averagegasstation: action.averagegasstation,
			};
		case "ACTUAL_BREND_PRICE":
			return {
				...state,
				actualbrendprice: action.actualbrendprice,
			};
		case "ACTUAL_DBDATA":
			return {
				...state,
				dbdata: action.dbdata,
			};
		case "ACTUAL_LATIT":
			return {
				...state,
				actlatit: action.actlatit,
			};
		case "ACTUAL_LOGNIT":
			return {
				...state,
				actlognit: action.actlognit,
			};
		case "SET_RENDERS":
			return { ...state, rendners: action.rendners };

		default:
			return state;
	}
};

export default reducer;
