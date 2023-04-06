import React from 'react';
import React, {useEffect} from 'react';
function App() {
  const navigate = useNavigate();
  return (
<Routes>
      <Route path="login" element={<Login />} />

    </Routes>
  );
}

export default App;