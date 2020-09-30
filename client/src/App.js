import React from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from './component/Card'
import "./App.css"

class App extends React.Component{
  state={
    data:"",
    filterData:"",
   isLoading:true
  }

  onFilter=(event)=>{
    let eventName=event.currentTarget.name;
    let eventValue=event.currentTarget.value;
    console.log(eventValue)

    this.setState({
      filterData:eventValue
    })
    this.props.history.push({
      pathname: '/',
      search: `?${eventName}=${eventValue}`, 
    });

  }






  componentDidMount=()=>{
    this.setState({
      isLoading:true
    })
   
    axios.get("/get")
    .then(res=>{
              this.setState({
               data:res.data,
               isLoading:false,

            })
      })
    .catch(err=>{
        console.log(err)
      })
      
    this.props.history.push("/")
    }
       



  render(){
   const launchYear=[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
   const successfulLaunch= ["true","false"];
   const successfulLanding=["true","false"];
   let filterValue=this.state.filterData;
   let apiData=this.state.data;

    return(
      <div>
          <header>
           <h1>Space X Launch Program</h1>
          </header>

          {this.state.isLoading ? 
            (
            <center>
               <CircularProgress />
            </center> // taken from material-ul for image of loading
            ) : 
            
            (
              
             <div className="container">

               {/* Filter Section */}
               <div className="filter-section">
                 <h2>Filters</h2>

                  {/* launch year filter */}
                  <h3 className="grey-col">Launch Year</h3>
                  {launchYear.map(year=>(
                     <div className="container-flex">
                       <Button className="btn" variant="contained" value={year} name="launch-year" onClick={(e)=>this.onFilter(e)}>{year}</Button>
                     </div>
                   ))
                  }


                  {/* successful launch filter */}
                  <h3 className="grey-col">Successful Launch</h3>
                  {successfulLaunch.map(status=>(
                    <div className="container-flex">
                      <Button className="btn" variant="contained" value={status} name="successful-launch" onClick={(e)=>this.onFilter(e)}>{status}</Button>
                    </div>
                   ))
                   }

 
                  {/* successful landing filter */}
                  <h3 className="grey-col">Successful Land</h3>
                  {successfulLanding.map(status=>(
                     <div className="container-flex">
                       <Button className="btn" variant="contained" value={status} name="successful-land" onClick={(e)=>this.onFilter(e)}>{status}</Button>
                     </div>
                   ))
                  }
          
              </div>  {/*close filter div */} 
         
              {/* card section */}
                <div className="card-section">

                      {
                        filterValue ? (
                          apiData && apiData.filter(
                             data=>{ 
                               return (data.launch_year && data.launch_year===filterValue) || (data.launch_success===JSON.parse(filterValue)) 
                              }) 
                             .map(filteredData=>(
                                  <Card 
                                  data={filteredData}/>
                              ))
                          ):(
                              apiData.map(data=>(
                                <Card 
                                data={data} />
                              ))
                            )
                      }
                     
                      
                      
                </div>
             </div> 
        )}
        <footer>
          <h3>Developed By- Chanchal upadhyay</h3>
        </footer>
         </div> 
    )
  }
}

export default App;
