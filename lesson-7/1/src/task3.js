import React from "react";
import PropTypes from "prop-types";
import { Button, Form, DropdownButton, Dropdown, Col } from "react-bootstrap";

/*
  В этом задании нужно доделать компоненты LocalizedText и LocalizedApp.
  Другие компоненты модифицировать не нужно.
  Для того чтобы LocalizedText получал доступ к словарю, нужно создать контекст.
*/



/*
  Все словари. Ключ - название языка.
  В каждом словаре ключ - текст на английском, значение - его перевод.
  Чтобы перевести, например, на немецкий слово Cancel, нужно достать значение
  dictionaries.de['Cancel']
*/
const dictionaries = {
  en: {
    Cancel: "Cancel",
    Save: "Save",
    Clear: "Clear"
  },
  de: {
    Cancel: "Stornieren",
    Save: "Sparen"
  },
  ru: {
    Cancel: "Отмена",
    Save: "Сохранить",
    Clear: "Очистить"
  }
};

const LanguageContext = React.createContext(dictionaries.en)


const languages = ["EN", "DE", "RU"];

/*
  children - строка с текстом.
  Используя контекст, LocalizedText должен получить доступ к словарю, 
  найти там перевод строки и отрендерить перевод вместо оригинальной строки.
  Если перевода нет, как, например, для Clear на немецком, должна показываться
  оригинальная строка на английском.
*/
const LocalizedText = ({ children }) => children;

LocalizedText.propTypes = {
  children: PropTypes.string.isRequired
};

class UserForm extends React.Component {
  state = {
    value: ""
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="primary">
            <LanguageContext.Consumer>
              {language => <LocalizedText>{language['Save']}</LocalizedText>}
            </LanguageContext.Consumer>
          </Button>
          <Button variant="danger">
            <LanguageContext.Consumer>
              {language => <LocalizedText>{language['Cancel']}</LocalizedText>}
            </LanguageContext.Consumer>
          </Button>
          <Button variant="warning">
            <LanguageContext.Consumer>
              {language => <LocalizedText>{language['Clear'] || 'Clear'}</LocalizedText>}
            </LanguageContext.Consumer>
          </Button>
          
        </Form.Group>
      </Form>
    );
  }
}

const LanguageSelector = ({ languages, currentLanguage, onChange }) => (
  <DropdownButton
    variant="primary"
    title={currentLanguage}
    onChange={console.log}
  >
    {languages.map(language => (
      <Dropdown.Item
        key={language}
        eventKey={language}
        active={language === currentLanguage}
        onSelect={onChange}
      >
        {language}
      </Dropdown.Item>
    ))}
  </DropdownButton>
);

class LocalizedApp extends React.Component {
  state = {
    language: "RU"
  };
  changeLanguage = (language) => {
    switch (language) {
      case 'RU':
        return dictionaries.ru
      case 'DE':
        return dictionaries.de
      case 'EN':
        return dictionaries.en
      default:
        return dictionaries.ru
    }
  }

  render() {
    return (
      <>
        <LanguageContext.Provider value={this.changeLanguage(this.state.language)} >
          <Col>
            <LanguageSelector
              languages={languages}
              currentLanguage={this.state.language}
              onChange={language => this.setState({ language })}
            />
          </Col>
          <Col>
            <UserForm />
          </Col>
        </LanguageContext.Provider>
      </>
    );
  }
}

export const Task3 = () => <LocalizedApp />;
Task3.title = "3. Context. Локализация.";
Task3.description = "Текст на кнопках должен меняться со сменой языка.";
