import { Container } from "@material-ui/core";
import ProjectList from "./views/projectList/projectList";
import Header from "./components/Header";

const App = () => {

  return (
    <>  
      <Header />
      <Container maxWidth={"lg"}>
        <main>
          <ProjectList />
        </main>
      </Container>
    </>
  );
};

export default App;
