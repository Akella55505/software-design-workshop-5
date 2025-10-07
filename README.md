# Лабораторно-практична робота №5

### «Розширення бекенд-додатку власними сутностями та реалізація REST API»

---

## Реалізовані сутності та їх зв’язки

### Діаграма інформаційної системи

![ДТП](images/ДТП.png)

### Опис

- **Accident** — містить усі дані специфічні до ДТП
- **Person** — містить інформацію про персону
- **Vehicle** — містить інформацію про транспортний засіб
- Було також реалізовано усі інші сутності з діаграми

**Зв’язок:** ManyToMany між Accident-Person та Accident-Vehicle. OneToOne між Person-Vehicle.

---

## Реалізовані API ендпоінти

### Accident

- `POST /v1/accidents` — створення запису
- `GET /v1/accidents` — отримання всіх записів
- `GET /v1/accidents/:id` — отримання запису за ID
- `PATCH /v1/accidents/:id` — оновлення запису
- `DELETE /v1/accidents/:id` — видалення запису

### Person

- `POST /v1/persons` — створення запису
- `GET /v1/persons` — отримання всіх записів
- `GET /v1/persons/:id` — отримання запису за ID
- `PATCH /v1/persons/:id` — оновлення запису
- `DELETE /v1/persons/:id` — видалення запису

### Vehicle

- `POST /v1/vehicle` — створення запису
- `GET /v1/vehicle` — отримання всіх записів
- `GET /v1/vehicle/:id` — отримання запису за ID
- `PATCH /v1/vehicle/:id` — оновлення запису
- `DELETE /v1/vehicle/:id` — видалення запису

---

## Результати тестування (скріншоти Postman)

### Accident

- `POST /v1/accidents`
  ![POST](images/accidentCreate.png)

- `GET /v1/accidents`
  ![GET1](images/accidentGetAll.png)

- `GET /v1/accidents/:id`
  ![GET2](images/accidentGet.png)

- `PATCH /v1/accidents/:id`
  ![PATCH](images/accidentPatch.png)

- `DELETE /v1/accidents/:id`
  ![DELETE](images/accidentDelete.png)

### Person

- `POST /v1/persons`
  ![POST](images/personCreate.png)

- `GET /v1/persons`
  ![GET1](images/personGetAll.png)

- `GET /v1/persons/:id`
  ![GET2](images/personGet.png)

- `PATCH /v1/persons/:id`
  ![PATCH](images/personPatch.png)

- `DELETE /v1/persons/:id`
  ![DELETE](images/personDelete.png)

### Vehicle

- `POST /v1/vehicles`
  ![POST](images/vehicleCreate.png)

- `GET /v1/vehicles`
  ![GET1](images/vehicleGetAll.png)

- `GET /v1/vehicles/:id`
  ![GET2](images/vehicleGet.png)

- `PATCH /v1/vehicles/:id`
  ![PATCH](images/vehiclePatch.png)

- `DELETE /v1/vehicles/:id`
  ![DELETE](images/vehicleDelete.png)
