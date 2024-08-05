import { useParams } from 'react-router-dom';
import UserData from '../components/ShopManager/Main/UserData';
import DisplayGrid from '../components/Home/DisplayGrid';
// will also need to import product data, possibly shop data?

const Shops = () => {
  const { id } = useParams();

  return (
    <UserData
      userId={id}
      render={() => (
        <div>
          <h1>Welcome to {UserData.shopName}'s Shop!</h1>
          <DisplayGrid />
        </div>
      )}
    />
  );
};

export default Shops;

