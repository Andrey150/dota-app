import React, { useEffect, useRef, useState } from 'react';
import { useService } from '../../services/api';
import { TextField } from '@mui/material';

export const Match = () => {
  const [match, setMatch] = useState<{ id: number; dire: string; radiant: string } | undefined>(undefined);
  const [matchId, setMatchId] = useState<string>('');
  const [isMatchNotFound, setIsMatchNotFound] = useState<boolean>(false); // Новый флаг для отслеживания, найден ли матч
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Для хранения таймера
  const abortControllerRef = useRef<AbortController | null>(null); // Для хранения AbortController

  const { getMatch } = useService();

  const searchMatch = async (currentMatchId: string) => {
    // Отменяю предыдущий запрос, если он есть
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Сбрасываем матч, чтобы не отображать старые данные
    setMatch(undefined);
    setIsMatchNotFound(false); // Сбрасываем состояние "матч не найден"

    // Создаю AbortController для запроса
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await getMatch({ value: currentMatchId, signal: controller.signal });
      if (res) {
        setMatch(res);
      } else {
        setIsMatchNotFound(true); // Если результат пуст, показываем "матч не найден"
      }
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('Previous request aborted');
      } else {
        console.error('Request failed', error);
        setIsMatchNotFound(true); // В случае ошибки показываем "матч не найден"
      }
    }
  };

  const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    setMatchId(str);
  };

  // Дебаунс функция
  const useDebounce = (value: string, delay: number) => {
    useEffect(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (value) {
          searchMatch(value); // Вызываем функцию поиска с текущим значением
        } else {
          setMatch(undefined); // Если значение пустое, сбрасываем матч
          setIsMatchNotFound(false);
        }
      }, delay);

      // Очистка таймера при размонтировании
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [value, delay]);
  };

  // Применяем дебаунс к matchId
  useDebounce(matchId, 500);

  return (
    <>
      <TextField
        id="outlined-uncontrolled"
        label="Номер матча"
        defaultValue={matchId}
        onChange={setInputValue}
        autoComplete='true'
      />
      {match ? (
        <div>
          <h2>{match.id}</h2>
          <h3>{match.dire}</h3>
          <h3>{match.radiant}</h3>
        </div>
      ) : isMatchNotFound ? (
        <p>Такой матч не найден</p>
      ) : (
        <p>Введите ID матча</p>
      )}
    </>
  );
};
