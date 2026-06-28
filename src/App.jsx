import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getWeather = async () => {
    try {
      const response = await fetch("http://api.weatherapi.com/v1/current.json?key=147893838f4c468a93271510261203&q=Lahore");
      const data = await response.json();
      setWeather(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <h1>Loading . . .</h1>
      </div>
    );
  }

  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section className='bg min-vh-100 p-lg-5 p-3 d-flex align-items-center'>
      <div className='container-fluid max-w-7xl mx-auto'>
        <div className='row g-4'>
          {/* Left Column (Weather Sidebar) */}
          <div className='col-12 col-lg-3 col-md-4'>
            <div className='card rounded-4 background border-0 shadow-lg h-100 overflow-hidden'>
              <div className='card-body p-3 p-md-4 d-flex flex-column'>
                <div className="search-container rounded-pill bg-light d-flex align-items-center px-3 py-2 mb-3 mb-md-4">
                  <div className="search-icon-wrap">
                    <i className="bi bi-search text-muted"></i>
                  </div>
                  <div className="search-input-wrap w-100 ms-3">
                    <input className='search-input border-0 bg-transparent text-dark w-100 outline-none' type='search' placeholder="Search city..."/>
                  </div>
                </div>

                <div className="weather-temp-section text-center mt-2 mt-md-3">
                  <div className="weather-icon-wrap">
                    <img className='img-fluid weather-main-icon' src={weather?.current?.condition?.icon} alt="Weather Icon"/>
                  </div>
                  <div className="temp-display mt-3 mt-md-4">
                    <h1 className='temp-value fw-bold text-white mb-0'>
                      {weather?.current?.temp_c}°<span className="temp-unit fw-normal">C</span>
                    </h1>
                  </div>
                </div>

                <div className='location-row d-flex justify-content-between align-items-center mt-4 mt-md-5 pb-3 border-bottom border-secondary text-white mx-1 mx-md-3'>
                  <div className="city-name">
                    <h4 className="m-0 fw-semibold location-title">{weather?.location?.name || 'Lahore'}</h4>
                  </div>
                  <div className="day-name">
                    <span className="day-label text-light">{dayName}</span>
                  </div>
                </div>

                <div className='weather-details mt-3 mt-md-4 text-white mx-1 mx-md-3'>
                  <div className="detail-item d-flex align-items-center mb-2 mb-md-3 text-light">
                    <div className="detail-icon-wrap me-2 me-md-3">
                      <i className="bi bi-cloud-lightning detail-icon"></i>
                    </div>
                    <div className="detail-text">{weather?.current?.condition?.text || 'Light Rain'}</div>
                  </div>
                  <div className="detail-item d-flex align-items-center mb-2 mb-md-3 text-light">
                    <div className="detail-icon-wrap me-2 me-md-3">
                      <i className="bi bi-thermometer-half detail-icon"></i>
                    </div>
                    <div className="detail-text">Min Temperature - 28°C</div>
                  </div>
                  <div className="detail-item d-flex align-items-center mb-0 text-light">
                    <div className="detail-icon-wrap me-2 me-md-3">
                      <i className="bi bi-thermometer detail-icon"></i>
                    </div>
                    <div className="detail-text">Max Temperature - 31°C</div>
                  </div>
                </div>

                <div className='stat-card card bg1 border-0 rounded-4 text-white mt-auto pt-2 mx-1 mx-md-2 mb-2'>
                  <div className='card-body py-2 px-2'>
                    <div className='row text-center g-0'>
                      <div className="col-6 border-end border-secondary">
                        <div className="stat-item">
                          <div className="stat-value-row d-flex align-items-center justify-content-center mb-1">
                            <div className="stat-icon-wrap me-1">
                              <i className="bi bi-water text-info stat-icon"></i>
                            </div>
                            <div className="stat-value-wrap">
                              <span className="fw-semibold stat-value">{weather?.current?.humidity}%</span>
                            </div>
                          </div>
                          <div className="stat-label-wrap">
                            <span className='text-secondary stat-label'>Humidity</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="stat-item">
                          <div className="stat-value-row d-flex align-items-center justify-content-center mb-1">
                            <div className="stat-icon-wrap me-1">
                              <i className="bi bi-wind text-white-50 stat-icon"></i>
                            </div>
                            <div className="stat-value-wrap">
                              <span className="fw-semibold stat-value">{weather?.current?.wind_kph} km/h</span>
                            </div>
                          </div>
                          <div className="stat-label-wrap">
                            <span className='text-secondary stat-label'>Wind Speed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Overview) */}
          <div className='col-12 col-lg-9 col-md-8'>
            <div className='card rounded-4 background border-0 shadow-lg h-100 p-3 p-lg-4'>
              <div className='card-body d-flex flex-column p-2 p-md-3'>
                
                {/* Tabs */}
                <div className='tabs-row d-flex align-items-center mb-3 mb-md-4'>
                  <div className="tab-item">
                    <h4 className='text-secondary me-3 me-md-4 mb-0 u-pointer tab-title'>Today</h4>
                  </div>
                  <div className="tab-item">
                    <h4 className='text-white fw-bold mb-0 text-decoration-underline decoration-custom tab-title'>Week</h4>
                  </div>
                </div>

                {/* 7-Days Forecast */}
                <div className='forecast-scroll row flex-nowrap overflow-auto g-2 g-md-3 mb-4 mb-md-5 pb-2 custom-scrollbar mx-0'>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                    <div className='col-auto' key={idx}>
                      <div className='card bg2 border-0 rounded-4 text-center day-card h-100'>
                        <div className='card-body p-2 p-md-3'>
                          <div className="day-name-label">
                            <h6 className='text-white mb-2 day-label'>{day}</h6>
                          </div>
                          <div className="day-icon-wrap my-2 my-md-3">
                            <img src='/image/sun.png' className='day-weather-icon img-fluid' alt="Sun" onError={(e) => { e.target.src = weather?.current?.condition?.icon; }}/>
                          </div>
                          <div className="day-temp-wrap">
                            <h5 className='text-white fw-bold mb-0 day-temp'>{idx === 2 ? '27°' : idx === 3 ? '31°' : idx === 4 ? '25°' : '32°'}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="overview-heading-wrap mb-3 mb-md-4">
                  <h4 className='text-white fw-bold mb-0 overview-title'>Today's Overview</h4>
                </div>

                {/* Today's Overview Top Row */}
                <div className='row g-3 g-md-4 mb-3 mb-md-4 flex-grow-1'>
                  <div className='col-12 col-sm-6 col-lg-4'>
                     <div className='card bg2 border-0 rounded-4 h-100 p-2 p-md-3 overview-card shadow-sm'>
                       <div className='card-body d-flex flex-column'>
                         <div className="overview-card-label">
                           <span className="text-secondary fw-semibold overview-label">Air Quality Index</span>
                         </div>
                         <div className="overview-card-value my-auto">
                           <h2 className='text-white fw-bold mb-0 overview-number'>53</h2>
                         </div>
                         <div className='overview-card-footer d-flex justify-content-between align-items-end mt-auto'>
                            <div className="overview-status-wrap">
                              <span className='text-success fw-bold overview-status'>Good</span>
                            </div>
                            <div className="overview-icon-wrap">
                              <img src='/image/cards/air-pollution.png' className="overview-card-icon" alt="" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                         </div>
                       </div>
                     </div>
                  </div>

                  <div className='col-12 col-sm-6 col-lg-4'>
                     <div className='card bg2 border-0 rounded-4 h-100 p-2 p-md-3 overview-card shadow-sm'>
                       <div className='card-body d-flex flex-column'>
                         <div className="overview-card-label">
                           <span className='text-secondary fw-semibold overview-label'>UV Index</span>
                         </div>
                         <div className="overview-card-value my-auto">
                           <h2 className='text-white fw-bold mb-0 overview-number'>{weather?.current?.uv || '3'}</h2>
                         </div>
                         <div className='overview-card-footer d-flex justify-content-between align-items-end mt-auto'>
                            <div className="overview-status-wrap">
                              <span className='text-warning fw-bold overview-status'>Moderate</span>
                            </div>
                            <div className="overview-icon-wrap">
                              <img src='/image/cards/uv.png' className="overview-card-icon" alt="" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                         </div>
                       </div>
                     </div>
                  </div>
                  
                  <div className='col-12 col-sm-6 col-lg-4'>
                     <div className='card bg2 border-0 rounded-4 h-100 p-2 p-md-3 overview-card shadow-sm'>
                       <div className='card-body d-flex flex-column'>
                         <div className="overview-card-label">
                           <span className='text-secondary fw-semibold overview-label'>Pressure (hpa)</span>
                         </div>
                         <div className="overview-card-value my-auto">
                           <h2 className='text-white fw-bold mb-0 overview-number'>{weather?.current?.pressure_mb || '1006'}</h2>
                         </div>
                         <div className='overview-card-footer d-flex justify-content-between align-items-end mt-auto'>
                            <div className="overview-status-wrap">
                              <span className='text-light fw-bold overview-status'>Normal</span>
                            </div>
                            <div className="overview-icon-wrap">
                              <img src='/image/cards/barometer.png' className="overview-card-icon" alt="" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>

                {/* Today's Overview Bottom Row */}
                <div className='row g-3 g-md-4 flex-grow-1'>
                  <div className='col-12 col-lg-8'>
                    <div className='card bg2 border-0 rounded-4 h-100 p-2 p-md-3 overview-card overview-card-chart shadow-sm'>
                      <div className='card-body d-flex flex-column'>
                        <div className="overview-card-label mb-2 mb-md-3">
                          <span className='text-secondary fw-semibold overview-label'>Precipitation</span>
                        </div>
                        <div className="chart-wrap text-center flex-grow-1 d-flex align-items-center justify-content-center">
                          <img src='/image/cards/Line Chart.png' className='img-fluid w-100 precipitation-chart' alt="Chart" onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className='col-12 col-lg-4'>
                    <div className='card bg2 border-0 rounded-4 h-100 p-2 p-md-3 overview-card shadow-sm'>
                      <div className='card-body d-flex flex-column justify-content-center'>
                        <div className="overview-card-label mb-3 mb-md-4">
                          <span className='text-secondary fw-semibold overview-label'>Sunrise & Sunset</span>
                        </div>
                        <div className='sun-item d-flex align-items-center mb-3 mb-md-4'>
                          <div className="sun-icon-wrap">
                            <img src='/image/cards/Sunrise.png' className="sun-icon" alt="Sunrise" onError={(e) => { e.target.style.display = 'none'; }} />
                          </div>
                          <div className='sun-info ms-3'>
                            <div className="sun-label-wrap">
                              <span className="text-secondary sun-label">Sunrise</span>
                            </div>
                            <div className="sun-time-wrap">
                              <span className='text-white fw-bold sun-time'>7:06 AM</span>
                            </div>
                          </div>
                        </div>
                        <div className='sun-item d-flex align-items-center'>
                          <div className="sun-icon-wrap">
                            <img src='/image/cards/Sunrise.png' className="sun-icon sun-icon-flip" alt="Sunset" onError={(e) => { e.target.style.display = 'none'; }} />
                          </div>
                          <div className='sun-info ms-3'>
                            <div className="sun-label-wrap">
                              <span className="text-secondary sun-label">Sunset</span>
                            </div>
                            <div className="sun-time-wrap">
                              <span className='text-white fw-bold sun-time'>7:03 PM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
