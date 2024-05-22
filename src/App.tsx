import "@mantine/core/styles.css";
import "./App.css";
import AgricultureAnalytics from "./AgricultureAnalytics";
import { MantineProvider } from "@mantine/core";

function App() {
    return (
        <MantineProvider>
            {/* Your app here */}
            <div className="App">
                <AgricultureAnalytics />
            </div>
        </MantineProvider>
    );
}

export default App;

