<?php include 'php/db_connect.php'; ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#d23369">
    <meta charset="UTF-8">
    <title>Обратная связь - SportLife</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Стили для страницы обратной связи */
        .feedback-section {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(255,105,180,0.1);
        }
        
        .feedback-section h1 {
            text-align: center;
            color: #d23369;
            margin-bottom: 2rem;
        }
        
        .feedback-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 3rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group.full-width {
            grid-column: span 2;
        }
        
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #d23369;
            font-weight: bold;
        }
        
        input, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ff69b4;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        input:focus, textarea:focus {
            border-color: #d23369;
            outline: none;
            box-shadow: 0 0 0 3px rgba(255,105,180,0.3);
        }
        
        textarea {
            min-height: 150px;
            resize: vertical;
        }
        
        .submit-btn {
            grid-column: span 2;
            background: linear-gradient(to right, #ff69b4, #d23369);
            color: white;
            border: none;
            padding: 15px;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(210,51,105,0.4);
        }
        
        .alert.success {
            background: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        .messages-list {
            margin-top: 3rem;
        }
        
        .messages-list h2 {
            text-align: center;
            color: #d23369;
            margin-bottom: 1.5rem;
        }
        
        .message {
            background: #fff0f5;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            border-left: 4px solid #ff69b4;
        }
        
        .message h3 {
            color: #d23369;
            margin-bottom: 0.5rem;
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <a href="index.html">Главная</a>
            <a href="nutrition.html">Питание</a>
            <a href="sports.html">Виды спорта</a>
            <a href="feedback.php">Обратная связь</a>
        </nav>
    </header>

    <main class="feedback-section">
        <h1>Обратная связь</h1>
        
        <?php if (isset($_GET['success'])): ?>
            <div class="alert success">Сообщение отправлено! Спасибо за ваш отзыв.</div>
        <?php endif; ?>

        <form class="feedback-form" action="php/process_feedback.php" method="POST">
            <div class="form-group">
                <label for="name">Ваше имя</label>
                <input type="text" id="name" name="name" placeholder="Иван Иванов" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="example@mail.com" required>
            </div>
            
            <div class="form-group full-width">
                <label for="message">Сообщение</label>
                <textarea id="message" name="message" placeholder="Ваш отзыв или предложение..." required></textarea>
            </div>
            
            <button type="submit" class="submit-btn">Отправить сообщение</button>
        </form>

        <div class="messages-list">
            <h2>Последние отзывы</h2>
            <?php
                $result = $conn->query("SELECT * FROM messages ORDER BY id DESC LIMIT 5");
                while ($row = $result->fetch_assoc()):
            ?>
                <div class="message">
                    <h3><?= htmlspecialchars($row['name']) ?></h3>
                    <p><?= htmlspecialchars($row['message']) ?></p>
                    <small><?= date('d.m.Y H:i', strtotime($row['created_at'])) ?></small>
                </div>
            <?php endwhile; ?>
        </div>
    </main>

    <footer>
        <p>Мой Telegram: <a href="https://t.me/borshevikas">@borshevikas</a></p>
    </footer>
    <script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful');
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
</script>
</body>
</html>