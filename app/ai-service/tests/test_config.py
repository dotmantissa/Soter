import pytest

from config import Settings


def test_ai_deterministic_mode_can_be_enabled_from_environment(monkeypatch):
    monkeypatch.setenv("AI_DETERMINISTIC_MODE", "true")

    settings = Settings()

    assert settings.ai_deterministic_mode is True


def test_test_provider_mode_can_be_enabled_from_environment(monkeypatch):
    monkeypatch.setenv("TEST_PROVIDER_MODE", "true")

    settings = Settings()

    assert settings.test_provider_mode is True


def test_test_provider_mode_defaults_to_false():
    settings = Settings()

    assert settings.test_provider_mode is False


def test_active_provider_returns_test_when_test_provider_mode_enabled(monkeypatch):
    monkeypatch.setenv("TEST_PROVIDER_MODE", "true")

    settings = Settings()

    assert settings.get_active_provider() == "test"


def test_validate_api_keys_returns_true_when_test_provider_mode(monkeypatch):
    monkeypatch.setenv("TEST_PROVIDER_MODE", "true")

    settings = Settings()

    assert settings.validate_api_keys() is True
