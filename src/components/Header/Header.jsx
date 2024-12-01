import React, { useState, useEffect } from "react";
import cartImage from "../../assets/cart.svg";
import userImage from "../../assets/user.svg";
import "./Header.scss";
import useDebounce from "../../hooks/debounce"; // Импортируем хук

const Header = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  // Вызываем хук useDebounce с задержкой в 500 мс
  const debouncedValue = useDebounce(inputValue, 500);

  // Вызываем onSearch только при изменении debouncedValue
  useEffect(() => {
    if (debouncedValue.trim() === "") {
      onSearch("");
    } else {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleInput = (event) => {
    setInputValue(event.target.value); // Обновляем inputValue
  };

  return (
    <header>
      <div className="search__box">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#323232"
          xmlns="http://www.w3.org/2000/svg"
          className="header_search"
        >
          <path
            d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
            fill="#323232"
          />
        </svg>
        <input
          id="headerInput"
          type="text"
          placeholder="Search products"
          onChange={handleInput} // Изменяем только inputValue
        />
      </div>
      <div className="item__box">
        <img src={cartImage} alt="Cart" className="header_cart" />
        <img src={userImage} alt="Userpage" className="header_userpage" />
      </div>
    </header>
  );
};

export default Header;
