import React from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Input } from "./Input";
import { UserForm } from "./UserForm";
import hoistNonReactStatics from 'hoist-non-react-statics'

/*
  В этом задании нужно научить компонент подключаться к состоянию, 
  общему для всего приложения. Для этого нужно закончить функцию connect 
  и модифицировать AppWithGlobalState.

  Для того, чтобы передавать глобально состояние компоненту любой вложенности,
  понадобиться новый контекст. Через него будут передаваться state и setState.
*/

/*
  Функция connect - компонент высшего порядка. 
  Component - компонент, который подключаем к глобальному состоянию,
  Через Consumer контекста созданный компонент-обертка должен передавать state и setState
  в Component.   
  Так же не забудьте реализовать все соглашения компонентов высшего порядка 
  (displayName, проброс props, копирование статических полей).
*/
function connect(Component) {
  class WithConnect extends React.Component {
    static displayName = `withConnnect(${Component.displayName || Component.name || ''})`
    render() {
      return (
        <StateContext.Consumer>
          {(state) => <Component state={{...state}} setState={(obj) => state.stateChanger(obj)} {...this.props} />}
        </StateContext.Consumer>
      )
    }
  };
  hoistNonReactStatics(WithConnect , Component)
  return WithConnect
}

/*
    Подключаем Input и UserForm к глобальному состоянию. Не меняйте
    ConnectedInput и ConnectedUserForm.
*/
const ConnectedInput = connect(({ state, setState }) => (
  <Input
    defaultValue={state.input}
    onChange={value => setState({ input: value })}
  />
));

const ConnecetedUserForm = connect(({ state, setState }) => (
  <UserForm user={state.user} onSave={user => setState({ user })} />
));

let StateContext = React.createContext()

class AppWithGlobalState extends React.Component {
  // единственное на все приложение состояние
  stateChanger = (value) => {
    this.setState({...this.state , ...value})
  }
  state = {
    input: "input text",
    user: {
      firstName: "Bill",
      lastName: "Smith",
      login: "billsmith"
    },
    stateChanger:  this.stateChanger
  };
  

  render() {
    console.log(this.state)
    return (
      // Компонент должен давать доступ к своему состоянию и setState через Provider контекста
      <>
      <StateContext.Provider value={this.state} >
        <Container>
          <Row>
            <Col>
              <ConnectedInput />
            </Col>
            <Col>
              <ConnecetedUserForm />
            </Col>
          </Row>
          <Row>
            <Form>
              <Form.Text>Глобальное состояние приложения</Form.Text>
              <Form.Group>
                <Form.Label>state.input</Form.Label>
                <Form.Control disabled type="text" value={this.state.input} />
              </Form.Group>
              <Form.Group>
                <Form.Label>state.user.firstName</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  value={this.state.user.firstName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>state.user.lastName</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  value={this.state.user.lastName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>state.user.login</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  value={this.state.user.login}
                />
              </Form.Group>
            </Form>
          </Row>
        </Container>
        </StateContext.Provider>
      </>
    );
  }
}

export const Task4 = () => <AppWithGlobalState />;

Task4.title = "4.Context + HoC. Глобальное состояние.";
Task4.description =
  "Глобальное состояни приложения должно менять при вводе в одиночный input" +
  "или при нажатии на кнопку Save формы.";
