import { withMultiLanguage, T } from 'react-multi-lang';
import axios from 'axios';

class App extends React.Component {
  componentDidMount() {
    this.loadTranslations('en'); // Загрузка английских переводов по умолчанию
  }

  loadTranslations = (lang) => {
    axios.get(`/api/translations/${lang}`).then(response => {
      // Предполагается, что Django REST API возвращает переводы в виде объекта { hello: "Привет" }
      this.props.setTranslations(response.data);
    });
  };

  handleLanguageChange = (lang) => {
    this.loadTranslations(lang);
  };

  render() {
    return (
      <div>
        <button onClick={() => this.handleLanguageChange('ru')}>RU</button>
        <button onClick={() => this.handleLanguageChange('en')}>EN</button>
        <button onClick={() => this.handleLanguageChange('sr')}>SR</button>
        <h1><T>hello</T></h1> {/* Текст будет переведён в зависимости от выбранного языка */}
      </div>
    );
  }
}

export default withMultiLanguage()(App);