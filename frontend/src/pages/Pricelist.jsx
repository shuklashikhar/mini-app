import { useEffect, useState } from "react";
import "../styles/pricelist.css";

function Pricelist() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const menuItems = [
    { label: "Invoices", icon: "🧾" },
    { label: "Customers", icon: "👥" },
    { label: "My Business", icon: "🏢" },
    { label: "Invoice Journal", icon: "📘" },
    { label: "Price List", icon: "💲" },
    { label: "Multiple Invoicing", icon: "📑" },
    { label: "Unpaid Invoices", icon: "⏰" },
    { label: "Offer", icon: "📄" },
    { label: "Inventory Control", icon: "📦" },
    { label: "Member Invoicing", icon: "👤" },
    { label: "Import/Export", icon: "🔁" },
    { label: "Log out", icon: "🚪" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://localhost:3001/pricelist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setItems(data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);
  const handleChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleKeyDown = (e, id, field) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateField(id, field, items.find((i) => i.id === id)[field]);
      e.target.blur();
    }
  };

  const updateField = (id, field, value) => {
    fetch(`http://localhost:3001/pricelist/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ field, value }),
    });
  };

  return (
    <div className="pricelist-layout">
      <header className="pl-header">
        <div className="pl-header-left">
          <span className="hamburger">☰</span>
          <div className="profile">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="profile-pic"
            />
            <span className="profile-name">John Andre</span>
          </div>
        </div>

        <div className="pl-header-right">
          <span>Norsk Bokmål</span>
          <img
            src="https://storage.123fakturere.no/public/flags/NO.png"
            alt="flag"
          />
        </div>
      </header>

      <div className="pl-body">
        <aside className="pl-sidebar">
          <h4 className="sidebar-title">Menu</h4>

          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`sidebar-item ${
                item.label === "Price List" ? "active" : ""
              }`}
            >
              <span className="sidebar-left">
                {item.label === "Price List" && <span className="active-dot" />}
                <span className="sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </div>
          ))}
        </aside>

        <main className="pl-content">
          <div className="pl-toolbar">
            <div className="pl-search">
              <div className="search-box">
                <input placeholder="Search Article No..." />
                <span className="search-icon">🔍</span>
              </div>

              <div className="search-box">
                <input placeholder="Search Product..." />
                <span className="search-icon">🔍</span>
              </div>
            </div>

            <div className="pl-actions">
              <button>New Product ➕</button>
              <button>Print List 🖨</button>
              <button>Advanced Mode ⚙</button>
            </div>
          </div>

          <div className="pl-table-wrapper">
            <table className="pl-table">
              <thead>
                <tr>
                  <th>Article No.</th>
                  <th>Product / Service</th>
                  <th>In Price</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>In Stock</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="field-with-arrow">
                        <span className="row-arrow">➜</span>
                        <div className="field-pill">
                          <input
                            value={item.article_no}
                            onChange={(e) =>
                              handleChange(
                                item.id,
                                "article_no",
                                e.target.value,
                              )
                            }
                            onBlur={() =>
                              updateField(
                                item.id,
                                "article_no",
                                item.article_no,
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(e, item.id, "article_no")
                            }
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="field-pill">
                        <input
                          defaultValue={item.product_name}
                          onBlur={(e) =>
                            updateField(item.id, "product_name", e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, item.id, "article_no")
                          }
                        />
                      </div>
                    </td>

                    <td>
                      <div className="field-pill">
                        <input
                          type="number"
                          defaultValue={item.in_price}
                          onBlur={(e) =>
                            updateField(item.id, "in_price", e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, item.id, "article_no")
                          }
                        />
                      </div>
                    </td>

                    <td>
                      <div className="field-pill">
                        <input
                          type="number"
                          defaultValue={item.price}
                          onBlur={(e) =>
                            updateField(item.id, "price", e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, item.id, "article_no")
                          }
                        />
                      </div>
                    </td>

                    <td>
                      <div className="field-pill">
                        <input
                          defaultValue={item.unit}
                          onBlur={(e) =>
                            updateField(item.id, "unit", e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, item.id, "article_no")
                          }
                        />
                      </div>
                    </td>

                    <td>
                      <div className="field-pill">
                        <input
                          type="number"
                          defaultValue={item.in_stock}
                          onBlur={(e) =>
                            updateField(item.id, "in_stock", e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, item.id, "article_no")
                          }
                        />
                      </div>
                    </td>

                    <td>
                      <div className="field-pill">
                        <input
                          defaultValue={item.description}
                          onBlur={(e) =>
                            updateField(item.id, "description", e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, item.id, "article_no")
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Pricelist;
