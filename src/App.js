import "leaflet/dist/leaflet.css";
import "antd/dist/antd.min.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Table, Select } from "antd";
import Routing from "./RouteMachine";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetRequestsAction } from "./store/reducers/requestsReducer";
import { asyncGetCitiesAction } from "./store/reducers/citiesReducer";
import { Container, Section, Bar } from "react-simple-resizer";
const { Column } = Table;

const App = () => {
  const defaultPosition = [55.431134, 37.544992];
  const [sourceCity, setSourceCity] = useState({});
  const [destinationCity, setDestinationCity] = useState({});
  const dispatch = useDispatch();
  const requestsList = useSelector(
    (state) => state.requestsReducer.requestsList
  );
  const citiesData = useSelector((state) => state.citiesReducer.citiesList);

  useEffect(() => {
    dispatch(asyncGetRequestsAction());
    dispatch(asyncGetCitiesAction());
  }, [dispatch]);

  const handleStartChange = (value) => {
    const currentCity = citiesData.filter((item) => item.name === value);
    setSourceCity(currentCity[0]?.coords);
  };

  const handleEndChange = (value) => {
    const currentCity = citiesData.filter((item) => item.name === value);
    setDestinationCity(currentCity[0]?.coords);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const selected = selectedRows[0];
      setSourceCity(selected?.startPoint.coords);
      setDestinationCity(selected?.endPoint.coords);
    }
  };

  const mapResizeObserver = (map) => {
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    const container = document.getElementById("map-container");
    resizeObserver.observe(container);
  };

  return (
    <Container className="container">
      <Section minSize={375}>
        {requestsList && (
          <Table
            className="table-wrapper"
            dataSource={requestsList}
            rowSelection={{ type: "radio", ...rowSelection }}
            pagination={false}
          >
            <Column title="Номер заявки" dataIndex="id" key="id" width={150} />
            <Column
              title="Точка погрузки"
              key="id"
              render={(item) => {
                return (
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Пункт загрузки"
                    defaultValue={item.startPoint.name}
                    onChange={handleStartChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {citiesData.map((city, index) => (
                      <Select.Option key={index} value={city.name}>
                        {city.name}
                      </Select.Option>
                    ))}
                  </Select>
                );
              }}
            />
            <Column
              title="Точка разгрузки"
              key="id"
              render={(item) => {
                return (
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Пункт назначения"
                    defaultValue={item.endPoint.name}
                    onChange={handleEndChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {citiesData.map((city, index) => (
                      <Select.Option key={index} value={city.name}>
                        {city.name}
                      </Select.Option>
                    ))}
                  </Select>
                );
              }}
            />
          </Table>
        )}
      </Section>

      <Bar size={10} style={{ background: "#1890ff", cursor: "col-resize" }} />

      <Section minSize={320}>
        <MapContainer
          id="map-container"
          center={defaultPosition}
          zoom={5}
          style={{ height: "100%", position: "relative" }}
          whenCreated={mapResizeObserver}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          <Routing sourceCity={sourceCity} destinationCity={destinationCity} />
        </MapContainer>
      </Section>
    </Container>
  );
};

export default App;
