import './App.css';
import CSVFileUploader from './components/CSVFileUploader';

function App() {
  return (
    <div className="App">
      <h1 className='font-serif text-[25px] shadow-md p-[8px] bg-blue-400 text-white'> 
        CSV File Uploader 
      </h1>
      <CSVFileUploader />
    </div>
  );
}

export default App;
