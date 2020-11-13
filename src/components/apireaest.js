import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../components/style.css';
import cx from 'classnames';



class ApiData extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      name:'',
      url: 'https://restcountries.eu/rest/v2/all',
      defolturl: 'https://restcountries.eu/rest/v2/all',
      updateFlag: false,
    }
    this.findCountry = this.findCountry.bind(this);
    this.addFindName = this.addFindName.bind(this);
    this.resetUrl = this.resetUrl.bind(this);
  }
  componentDidMount(){
    fetch(this.state.url)
    .then(response => response.json())
    .then(data => this.setState({data}))  
  }
  
  componentDidUpdate(){
    if(this.state.updateFlag === true){
      this.setState({updateFlag: false});
      fetch(this.state.url)
      .then(response => response.json())
      .then(data => this.setState({data}))  
    }
  }
  findCountry(e){
    e.preventDefault();
    if(this.state.name !== ''){
      const link = 'https://restcountries.eu/rest/v2/name/';
      let newUrl = this.state.name
      newUrl= newUrl[0].toUpperCase() + newUrl.slice(1).toLowerCase();
      newUrl = link + newUrl;
  
      this.setState({url: newUrl,updateFlag: true})
    }else{
      alert('enter country name')
    }
  }

  addFindName(e){
    this.setState({name: e.target.value})
  }

  resetUrl(){
    const defolturl = this.state.defolturl;
    this.setState({ url: defolturl})
  }

  render(){
    return(
      <div>
        <form className = {cx({
          findingTools: true
        })} >
          <input onChange={this.addFindName} value ={this.state.name} placeholder='Enter country name' type="text"/>
          <button onClick = {this.findCountry} type='submit'>Find</button>
          <button onClick = {this.resetUrl} type='submit'>Show All Countries</button>
        </form>

        {this.state.data.map(item=>{
          return(
            <div className = {cx({
              contryBlock: true,
            })} id={uuidv4()} key={uuidv4()}>
              <div className="infoBlock">
                <h1>{item.name}</h1>
                <p>Capital: {item.capital}</p>
                <p>Region: {item.region}</p>
                <p>Population: {item.population}</p>
              </div>
              <img src={item.flag} alt=""/>
            </div>
          )      
        })}
      </div>
    )
  }
}

export default ApiData;