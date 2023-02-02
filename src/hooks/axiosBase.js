import axios from "axios";

// Se crea una herramienta axios para poder utilizarla en el use Fetchs
export const backendApi = axios.create({
    baseURL: "https://prod-10.brazilsouth.logic.azure.com/workflows/738d8ab36e724024beaf3b2e2fe2b532/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=t_Errb-4mLQ9KuoFMs_hWlY3UbDAmYYGgC5UDIJfebs",
});

// Se crea la variable de la url base de la API
const baseURL = "https://prod-10.brazilsouth.logic.azure.com/workflows/738d8ab36e724024beaf3b2e2fe2b532/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=t_Errb-4mLQ9KuoFMs_hWlY3UbDAmYYGgC5UDIJfebs";
export default baseURL