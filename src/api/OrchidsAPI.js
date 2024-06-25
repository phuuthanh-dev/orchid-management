export async function getAllOrchids() {
  try {
    const response = await fetch(
      "https://6670d5560900b5f8724bb6a8.mockapi.io/orchids"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch orchids");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orchids:", error);
    return [];
  }
}

export async function getOrchidById(id) {
  try {
    const response = await fetch(
      `https://6670d5560900b5f8724bb6a8.mockapi.io/orchids/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch orchids");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function deleteOrchidById(id) {
  try {
    const response = await fetch(
      `https://6670d5560900b5f8724bb6a8.mockapi.io/orchids/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete orchids");
    }
    return true;
  } catch (error) {
    console.error("Error fetching orchids:", error);
    return false;
  }
}

export async function editOrchidById(values) {
  try {
    const response = await fetch(
      `https://6670d5560900b5f8724bb6a8.mockapi.io/orchids/${values.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to edit orchid");
    }
    return true;
  } catch (error) {
    console.error("Error editing orchid:", error);
    return false;
  }
}

export async function addOrchid(values) {
  try {
    const response = await fetch(
      `https://6670d5560900b5f8724bb6a8.mockapi.io/orchids`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add orchid.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding orchid:", error);
    throw error;
  }
}
