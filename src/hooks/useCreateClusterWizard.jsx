
import {
    createContext,
    useContext,
    useEffect,
    useReducer
} from "react";
import { CosmosApiInstance } from '@/api';

const ClusterWizardContext = createContext(null);


const initWizard = {
    wizard: {
        cluster: {
            band_width_level_name: "Medium Speed",
            baseImage: "rayApp",
            brandName: "Apple",
            download_speed_mbps: 400,
            duration_count: 9,
            duration_type: "Weekly",
            hardwareId: 193,
            hardwareName: "M2",
            hardwareQuantity: 101,
            hardware_quantity: 11,
            locations: [{ id: 4, iso2: "JP", name: "Japan" }],
            name: "test123",
            securityComliance: "e2eEncrypted",
            supplier: "cinc",
            sustainableGPU: true,
            type: "general",
            upload_speed_mbps: 300,
        },
        current: 0,
    },
    availableOptions: {}
};

const wizardDataUpdater = (state, payload) => {
    const value = { ...state };
    if (payload.isChangeStep) {
        value.wizard.current = payload.currentIndex;
    } else if (payload.isSetupAvailableOptions) {
        value.availableOptions = payload.data;
    } else {
        value.wizard.cluster[`${payload.field.name}`] = payload.field.value;
    }
    // console.log(JSON.stringify(value.wizard.cluster));
    return value;
}


const ClusterWizardContextProvider = ({ children, value }) => {
    // const [wizard, setWizard] = useState(value || wizardData);
    const [wizard, dispatch] = useReducer(wizardDataUpdater, initWizard);
    // console.log(wizard.current);
    useEffect(() => {
        const loadOptions4CreatingCluster = async () => {
            try {
                const resp = await CosmosApiInstance.createClusterRay();
                if (resp && resp.code === 200 && resp.success) {
                    dispatch({ isSetupAvailableOptions: true, data: resp.data });
                } else {
                    console.log("not data found");
                }
            } catch (error) {
                console.log("not data found");
            }
        }
        loadOptions4CreatingCluster();
    }, []);


    return <ClusterWizardContext.Provider value={{ ...wizard, dispatch }}>
        {children}
    </ClusterWizardContext.Provider>

}
export const useClusterWizardContext = () => {
    return useContext(ClusterWizardContext)
};
export default ClusterWizardContextProvider;